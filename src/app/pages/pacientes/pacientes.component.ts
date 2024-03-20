import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BuscarPaciente } from 'src/app/models/buscarpaciente.model';
import { TipoDocumento } from 'src/app/models/tipodocumento.model';
import { PacienteService } from 'src/app/services/paciente.service';
import { NgForm } from '@angular/forms';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
})
export class PacientesComponent implements OnInit {
  forma!: FormGroup;
  pacientes!: any[];
  tipodocumentos!: TipoDocumento[];
  constructor(
    public pacienteService: PacienteService,
    public router: Router,
    public tipoDocumentoService: TipoDocumentoService
  ) {}

  ngOnInit(): void {
    this.forma = new FormGroup({
      tipoDoc: new FormControl(''),
      numDoc: new FormControl(''),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
    });
    this.listarTipoDocumento();
    this.listarPaciente();
  }
  noHayRegistros: boolean = false;
  listarPaciente() {
    let request = new BuscarPaciente(
      this.forma.value.tipoDoc,
      this.forma.value.numDoc,
      this.forma.value.nombre,
      this.forma.value.apellido
    );
    this.pacienteService.buscarPaciente(request).subscribe((resp) => {
      if (resp && resp.length > 0) {
        this.pacientes = resp;
        this.noHayRegistros = false;
      } else {
        this.pacientes = [];
        this.noHayRegistros = true;
      }
    });
  }

  listarTipoDocumento() {
    this.tipoDocumentoService.listarTipoDocumento().subscribe((resonse) => {
      this.tipodocumentos = resonse;
    });
  }
  eliminarPaciente(idPaciente: number) {
    this.pacienteService.eliminarPaciente(idPaciente).subscribe(
      (response) => {
        this.listarPaciente();
        console.log('Paciente eliminado correctamente');
        // Actualizar la lista de pacientes aquí si es necesario
      },
      (error) => {
        console.error('Error al eliminar paciente:', error);
        // Manejar el error aquí si es necesario
      }
    );
  }

  onCancel() {
    this.forma?.get('tipoDoc')?.setValue('');
    this.forma?.get('numDoc')?.setValue('');
    this.forma?.get('nombre')?.setValue('');
    this.forma?.get('apellido')?.setValue('');
    this.listarPaciente();
  }
}
