import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignalsIntroComponent } from './signals-intro/signals-intro.component';
import { EffectsComponent } from './effects/effects.component';
import { ElementoListComponent } from './elemento-list/elemento-list.component';
import { ElementoDetailsComponent } from './elemento-details/elemento-details.component';
import { ComputedSignalComponent } from './computed-signal/computed-signal.component';

@NgModule({
  declarations: [
    AppComponent,
    SignalsIntroComponent,
    EffectsComponent,
    ElementoListComponent,
    ElementoDetailsComponent,
    ComputedSignalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
