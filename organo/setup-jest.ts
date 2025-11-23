// `jest-preset-angular/setup-env/zone` may not expose TypeScript declarations
// in some setups; ignore the TS error and call the helper to enable the
// Angular testing environment for field decorators.
// @ts-ignore
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
setupZoneTestEnv();

// Resolve external component resources (templateUrl/styleUrls) globally
// so that standalone components with external files are compiled in JIT
// during tests without requiring inline templates in every spec.
// We use the internal symbol `ɵresolveComponentResources` and provide
// a resolver that reads files from disk. This is safe for test-only
// setup and prevents repeated boilerplate in specs.
// @ts-ignore
import { ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import * as fs from 'fs';
import * as path from 'path';

function findFileSync(startDir: string, target: string): string | null {
	const exclude = new Set(['node_modules', '.git', '.angular', 'dist', 'out', 'coverage']);
	const stack = [startDir];
	while (stack.length) {
		const dir = stack.pop() as string;
		let entries: fs.Dirent[];
		try {
			entries = fs.readdirSync(dir, { withFileTypes: true });
		} catch (e) {
			continue;
		}
		for (const entry of entries) {
			if (exclude.has(entry.name)) continue;
			const p = path.join(dir, entry.name);
			if (entry.isFile() && entry.name === target) return p;
			if (entry.isDirectory()) stack.push(p);
		}
	}
	return null;
}

// Register global resolver once; this will preload resources used by components
// when Angular calls resolveComponentResources during JIT compilation.
resolveComponentResources((url: string) => {
	return new Promise<string>((resolve) => {
		try {
			// Try common candidate paths
			const candidates = [
				path.resolve(process.cwd(), url),
				path.resolve(process.cwd(), 'src', url),
			];
			let found: string | null = null;
			for (const c of candidates) {
				if (fs.existsSync(c) && fs.statSync(c).isFile()) {
					found = c;
					break;
				}
			}

			if (!found) {
				// Fallback: search by basename across the repository (might be slower)
				const target = path.basename(url);
				found = findFileSync(process.cwd(), target);
			}

			if (!found) return resolve('');
			const content = fs.readFileSync(found, 'utf8');
			resolve(content);
		} catch (e) {
			// On any error, resolve to empty string to avoid failing tests setup
			resolve('');
		}
	});
});

// Expose helper so individual specs can trigger resource resolution at the
// appropriate time (i.e., right before they configure the TestBed). Calling
// this from a spec ensures that queued component resource URLs are resolved
// just-in-time for that test.
(global as any).__resolveTestResources = function() {
	return resolveComponentResources((url: string) => {
		return new Promise<string>((resolve) => {
			try {
				const candidates = [
					path.resolve(process.cwd(), url),
					path.resolve(process.cwd(), 'src', url),
				];
				let found: string | null = null;
				for (const c of candidates) {
					if (fs.existsSync(c) && fs.statSync(c).isFile()) {
						found = c;
						break;
					}
				}
				if (!found) {
					const target = path.basename(url);
					found = findFileSync(process.cwd(), target);
				}
				if (!found) return resolve('');
				const content = fs.readFileSync(found, 'utf8');
				resolve(content);
			} catch (e) {
				resolve('');
			}
		});
	});
};