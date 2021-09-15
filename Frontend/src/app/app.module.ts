import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PlatosComponent } from './components/platos/platos.component';
import { CrearPlatoComponent } from './components/crear-plato/crear-plato.component';
import { EditarPlatoComponent } from './components/editar-plato/editar-plato.component';
import { DetallePlatoComponent } from './components/detalle-plato/detalle-plato.component';

@NgModule({
  declarations: [
    AppComponent,
    PlatosComponent,
    DetallePlatoComponent,
    EditarPlatoComponent,
    CrearPlatoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
