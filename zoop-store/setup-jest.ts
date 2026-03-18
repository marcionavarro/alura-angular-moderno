import 'jest-preset-angular/setup-jest';
import '@angular/compiler';

// Mock global do IntersectionObserver
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

(globalThis as any).IntersectionObserver = IntersectionObserverMock;