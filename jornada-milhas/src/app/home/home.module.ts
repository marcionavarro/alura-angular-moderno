import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../core/material/material.module";
import { SharedModule } from "../shared/shared.module";
import { DepoimentosComponent } from "./depoimentos/depoimentos.component";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { PromocoesComponent } from "./promocoes/promocoes.component";

@NgModule({
    declarations: [
        DepoimentosComponent,
        HomeComponent,
        PromocoesComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MaterialModule,
        SharedModule
    ],
    exports: [
        DepoimentosComponent,
        HomeComponent,
        PromocoesComponent
    ]
})
export class HomeModule { }