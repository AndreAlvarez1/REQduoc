import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RequerimientosComponent } from './components/requerimientos/requerimientos.component';
import { RequerimientoComponent } from './components/requerimiento/requerimiento.component';
import { AsignaturasComponent } from './components/asignaturas/asignaturas.component';
import { FilterPipe } from './pipes/filter.pipe';
import { MenuComponent } from './shared/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RequerimientosComponent,
    RequerimientoComponent,
    AsignaturasComponent,
    FilterPipe,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
