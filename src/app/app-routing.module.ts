import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsignaturasComponent } from './components/asignaturas/asignaturas.component';
import { LoginComponent } from './components/login/login.component';
import { RequerimientoComponent } from './components/requerimiento/requerimiento.component';
import { RequerimientosComponent } from './components/requerimientos/requerimientos.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'requerimientos', component: RequerimientosComponent, canActivate: [AuthGuard]},
  {path: 'requerimiento/:id', component: RequerimientoComponent},
  {path: 'asignaturas', component: AsignaturasComponent},

  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
