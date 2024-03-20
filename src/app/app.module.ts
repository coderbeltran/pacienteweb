import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PacienteService } from './services/paciente.service';

import {HttpClientModule} from '@angular/common/http';
import { RegistroPacienteComponent } from './pages/registro-paciente/registro-paciente.component';
@NgModule({
  declarations: [
    AppComponent,
    PacientesComponent,
    RegistroPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
