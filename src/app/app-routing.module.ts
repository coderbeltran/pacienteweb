import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { RegistroPacienteComponent } from './pages/registro-paciente/registro-paciente.component';

const routes: Routes = [
  { path: 'listarPaciente', component: PacientesComponent },
  { path: 'registrarPaciente', component: RegistroPacienteComponent },
  {
    path: 'registrarPaciente/:idPaciente',
    component: RegistroPacienteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
