import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsComponent } from './effects/effects.component';
import { ElementoDetailsComponent } from './elemento-details/elemento-details.component';
import { ElementoListComponent } from './elemento-list/elemento-list.component';
import { SignalsIntroComponent } from './signals-intro/signals-intro.component';
import { ComputedSignalComponent } from './computed-signal/computed-signal.component';

const routes: Routes = [
  { path: '', redirectTo: 'elements', pathMatch: 'full' },
  { path: 'intro', component: SignalsIntroComponent },
  { path: 'effects', component: EffectsComponent },
  { path: 'computed-signal', component: ComputedSignalComponent },
  {
    path: 'elements',
    children: [
      { path: '', component: ElementoListComponent, outlet: 'list' },
      { path: '', component: ElementoDetailsComponent, outlet: 'details' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
