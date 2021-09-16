import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlatosComponent} from './components/platos/platos.component';
import { CrearPlatoComponent} from './components/crear-plato/crear-plato.component';
import { DetallePlatoComponent} from './components/detalle-plato/detalle-plato.component';
import { EditarPlatoComponent} from './components/editar-plato/editar-plato.component';
import { ContactoComponent } from './components/contacto/contacto.component';


const routes: Routes = [
  {path: 'platos', component:PlatosComponent},
  {path: 'guardarPlato', component:CrearPlatoComponent},
  {path: 'plato/:id', component:DetallePlatoComponent},
  {path: 'editarPlato/:id', component:EditarPlatoComponent},
  {path: 'contacto', component:ContactoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
