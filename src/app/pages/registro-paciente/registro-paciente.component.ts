import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Acompanante,
  Paciente,
  PacienteAcompanante,
} from 'src/app/models/registrarpaciente.model';
import { PacienteService } from 'src/app/services/paciente.service';
import { SexoService } from '../../services/sexo.service';
import { Sexo } from '../../models/sexo.model';
import { Parentesco } from 'src/app/models/parentesco.model';
import { ParentescoService } from 'src/app/services/parentesco.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { Departamento, Distrito, Provincia } from 'src/app/models/ubigeo.model';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { TipoDocumento } from 'src/app/models/tipodocumento.model';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.scss'],
})
export class RegistroPacienteComponent implements OnInit {
  idPaciente!: string | null;

  formPaciente!: FormGroup;
  formAcompanante!: FormGroup;
  tipodocs!: any[];
  pacientes!: any[];
  sexo!: Sexo[];
  listaParentescos!: Parentesco[];
  pacienteModel!: Paciente;
  acompananteModel!: Acompanante;
  departamentos!: Departamento[];
  provinciasAcompanante!: Provincia[];
  distritosAcompanante!: Distrito[];
  provinciasPaciente!: Provincia[];
  distritosPaciente!: Distrito[];
  tipodocumentos!: TipoDocumento[];
  registroExitoso = true;
  pacienteRegistrado = false;
  detallePacienteAcompanante!: PacienteAcompanante;
  edades = {
    paciente: '',
    acompanate: '',
  };
  accionBoton = {
    mensaje: 'registrado',
    deshabilitado: false,
    registrado: false,
  };
  ubigeoAcompanante = {
    departamento: '',
    provincia: '',
    distrito: '',
  };
  ubigeoPaciente = {
    departamento: '',
    provincia: '',
    distrito: '',
  };

  constructor(
    public pacienteService: PacienteService,
    public router: Router,
    public sexoService: SexoService,
    public parentescoService: ParentescoService,
    public ubigeoService: UbigeoService,
    public tipoDocumentoService: TipoDocumentoService,
    private route: ActivatedRoute
  ) {
    this.idPaciente = this.route.snapshot.paramMap.get('idPaciente');
  }

  ngOnInit(): void {
    this.inicarFormulario(
      new PacienteAcompanante(new Paciente(), new Acompanante())
    );

    this.tipodocs = [
      {
        id: 1,
        nombre: 'DNI',
      },
      {
        id: 2,
        nombre: 'CCE',
      },
      {
        id: 3,
        nombre: 'PASS',
      },
    ];

    this.listarSexo();
    this.listarParentesco();
    this.listarUbigeo();
    this.listarTipoDocumento();
    if (
      this.idPaciente != undefined &&
      this.idPaciente != null &&
      this.idPaciente != ''
    ) {
      // llamar a metodo detalle paciente
      this.detallePaciente(this.idPaciente);
    }
  }

  inicarFormulario(detalle: PacienteAcompanante) {
    const pacienteAcompanante: PacienteAcompanante = detalle;
    if (detalle.acompanante == null) {
      detalle.acompanante = new Acompanante();
    }

    if (
      detalle.acompanante?.ubigeo != null &&
      detalle.acompanante?.ubigeo != ''
    ) {
      let ubigeo = detalle.acompanante.ubigeo.match(/.{1,2}/g) || [''];
      this.ubigeoAcompanante = {
        departamento: ubigeo[0],
        provincia: ubigeo[1],
        distrito: detalle.acompanante.ubigeo,
      };
    }
    if (detalle.paciente.ubigeo != null && detalle.paciente.ubigeo != '') {
      let ubigeo = detalle.paciente.ubigeo.match(/.{1,2}/g) || [''];
      this.ubigeoPaciente = {
        departamento: ubigeo[0],
        provincia: ubigeo[1],
        distrito: detalle.paciente.ubigeo,
      };
    }
    this.formPaciente = new FormGroup({
      tipoDocumento: new FormControl(
        detalle.paciente.tipoDocumento == 0
          ? ''
          : detalle.paciente.tipoDocumento
      ),
      documento: new FormControl(detalle.paciente.documento),
      apellidoPat: new FormControl(detalle.paciente.apellidoPat),
      apellidoMat: new FormControl(detalle.paciente.apellidoMat),
      nombres: new FormControl(detalle.paciente.nombres),
      idSexo: new FormControl(
        detalle.paciente.idSexo == 0 ? '' : detalle.paciente.idSexo
      ),
      fechaNacimiento: new FormControl(detalle.paciente.fechaNacimiento),
      lugarNacimiento: new FormControl(detalle.paciente.lugarNacimiento),
      direccion: new FormControl(detalle.paciente.direccion),
      ubigeo: new FormControl(detalle.paciente.ubigeo),
      departamento: new FormControl(this.ubigeoPaciente.departamento),
      provincia: new FormControl(this.ubigeoPaciente.provincia),
      distrito: new FormControl(this.ubigeoPaciente.distrito),
    });
    this.formAcompanante = new FormGroup({
      idPaciente: new FormControl(detalle.acompanante.idPaciente),
      tipoDocumento: new FormControl(
        detalle.acompanante.tipoDocumento == 0
          ? ''
          : detalle.acompanante.tipoDocumento
      ),
      documento: new FormControl(detalle.acompanante.documento),
      apellidoPat: new FormControl(detalle.acompanante.apellidoPat),
      apellidoMat: new FormControl(detalle.acompanante.apellidoMat),
      nombres: new FormControl(detalle.acompanante.nombres),
      fechaNacimiento: new FormControl(detalle.acompanante.fechaNacimiento),
      idParentesco: new FormControl(
        detalle.acompanante.idParentesco == 0
          ? ''
          : detalle.acompanante.idParentesco
      ),
      telefono: new FormControl(detalle.acompanante.telefono),
      direccion: new FormControl(detalle.acompanante.direccion),
      ubigeo: new FormControl(detalle.acompanante.ubigeo),
      departamento: new FormControl(this.ubigeoAcompanante.departamento),
      provincia: new FormControl(this.ubigeoAcompanante.provincia),
      distrito: new FormControl(this.ubigeoAcompanante.distrito),
    });
    this.inicarUbigeoAcompanate();
  }
  inicarUbigeoAcompanate() {
    if (
      this.departamentos != undefined &&
      this.departamentos.length > 0 &&
      this.ubigeoPaciente.departamento != ''
    ) {
      this.seleccionarProvinciaPaciente(this.ubigeoPaciente.departamento);
      this.formPaciente.controls['provincia'].setValue(
        this.ubigeoPaciente.provincia
      );

      this.seleccionarDistritoPaciente(this.ubigeoPaciente.provincia);
      this.formPaciente.controls['distrito'].setValue(
        this.ubigeoPaciente.distrito
      );
    }

    if (
      this.departamentos != undefined &&
      this.departamentos.length > 0 &&
      this.ubigeoAcompanante.departamento != ''
    ) {
      this.seleccionarProvinciaAcompanante(this.ubigeoAcompanante.departamento);
      this.formAcompanante.controls['provincia'].setValue(
        this.ubigeoAcompanante.provincia
      );

      this.seleccionarDistritoAcompanante(this.ubigeoAcompanante.provincia);
      this.formAcompanante.controls['ubigeo'].setValue(
        this.ubigeoAcompanante.distrito
      );
    }
  }
  listarTipoDocumento() {
    this.tipoDocumentoService.listarTipoDocumento().subscribe((resonse) => {
      this.tipodocumentos = resonse;
    });
  }
  detallePaciente(idpaciente: string) {
    this.pacienteService
      .detallePciente(idpaciente)
      .subscribe((resonse: PacienteAcompanante) => {
        this.detallePacienteAcompanante = resonse;
        this.inicarFormulario(resonse);
        this.calcularEdadPacienteAcompanante();
      });
  }
  registrarPaciente() {
    this.accionBoton = {
      ...this.accionBoton,
      deshabilitado: true,
    };

    this.pacienteModel = {
      tipoDocumento: this.formPaciente.value.tipoDocumento,
      documento: this.formPaciente.value.documento,
      apellidoPat: this.formPaciente.value.apellidoPat,
      apellidoMat: this.formPaciente.value.apellidoMat,
      nombres: this.formPaciente.value.nombres,
      idSexo: this.formPaciente.value.idSexo,
      fechaNacimiento: this.formPaciente.value.fechaNacimiento,
      lugarNacimiento: this.formPaciente.value.lugarNacimiento,
      direccion: this.formPaciente.value.direccion,
      ubigeo: this.formPaciente.value.distrito,
    };
    this.acompananteModel = { ...this.formAcompanante.value };
    let request = {
      paciente: this.pacienteModel,
      acompanante: this.acompananteModel,
    };

    if (
      this.idPaciente != undefined &&
      this.idPaciente != null &&
      this.idPaciente != ''
    ) {
      request.paciente = {
        ...request.paciente,
        idPaciente: Number(this.idPaciente),
      };
      request.acompanante = {
        ...request.acompanante,
        idPaciente: Number(this.idPaciente),
        idPacienteAcompanante:
          this.detallePacienteAcompanante.acompanante.idPacienteAcompanante,
      };
      this.pacienteService.editarPaciente(request).subscribe(
        (response) => {
          this.registroExitoso = true;
          this.resetBoton('actualizado', true);
        },
        (error) => {
          this.registroExitoso = false;
          console.error('Error al registrar el paciente:', error);
          this.resetBoton('actualizado', false);
          // Aquí puedes mostrar un mensaje de error al usuario o realizar otras acciones necesarias.
        }
      );
    } else {
      this.pacienteService.registrarPaciente(request).subscribe(
        (response) => {
          this.registroExitoso = true;
          this.resetBoton('registrado', true);
        },
        (error) => {
          this.registroExitoso = false;
          console.error('Error al registrar el paciente:', error);
          this.resetBoton('registrado', false);
          // Aquí puedes mostrar un mensaje de error al usuario o realizar otras acciones necesarias.
        }
      );
    }
  }
  resetBoton(mensaje: string, registrado: boolean) {
    this.accionBoton = {
      ...this.accionBoton,
      mensaje,
      registrado,
      deshabilitado: false,
    };
  }
  calcularEdad(event: any, type: string) {
    const resultadoEdad = this.fechaAEdad(event.target.value);

    if (type == 'edadAcompanate') {
      this.edades.acompanate = resultadoEdad;
    } else {
      this.edades.paciente = resultadoEdad;
    }
  }
  calcularEdadPacienteAcompanante() {
    if (
      this.formPaciente.value.fechaNacimiento != null &&
      this.formPaciente.value.fechaNacimiento != ''
    ) {
      this.edades.paciente = this.fechaAEdad(
        this.formPaciente.value.fechaNacimiento
      );
    }
    if (
      this.formAcompanante.value.fechaNacimiento != undefined &&
      this.formAcompanante.value.fechaNacimiento != '' &&
      this.formAcompanante.value.fechaNacimiento != null
    ) {
      this.edades.acompanate = this.fechaAEdad(
        this.formAcompanante.value.fechaNacimiento
      );
    }
  }

  fechaAEdad(fecha: string) {
    const fechaActual: Date = new Date();
    const diff = fechaActual.getTime() - new Date(fecha).getTime();
    const edad = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)).toString();

    const milisegundosPorDia = 1000 * 60 * 60 * 24;
    const diasPorMes = 30.44;
    const diasPorAno = 365.25;

    let dias = diff / milisegundosPorDia;
    const anos = Math.floor(dias / diasPorAno);
    dias -= anos * diasPorAno;
    const meses = Math.floor(dias / diasPorMes);
    dias -= meses * diasPorMes;

    console.log(`${anos} años, ${meses} meses y ${Math.floor(dias)} días`);
    const resultadoEdad = `${anos}AA${meses}MM${Math.floor(dias)}DD`;
    return resultadoEdad;
  }
  listarSexo() {
    this.sexoService.listarSexo().subscribe((resonse) => {
      this.sexo = resonse;
    });
  }
  listarParentesco() {
    this.parentescoService.listarParentesco().subscribe((resonse) => {
      this.listaParentescos = resonse;
    });
  }

  listarUbigeo() {
    this.ubigeoService.listarUbigeo().subscribe((resonse) => {
      this.departamentos = resonse;

      this.inicarUbigeoAcompanate();
      //this.formAcompanante.controls['provincia'].setValue('');
    });
  }

  seleccionarProvinciaAcompanante(id?: string) {
    let idDepartamento =
      id != undefined ? id : this.formAcompanante.value.departamento;
    if (idDepartamento !== '') {
      this.provinciasAcompanante =
        this.departamentos.find((element) => {
          return element.id === idDepartamento;
        })?.provincias || [];
      this.provinciasAcompanante.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
      this.distritosAcompanante = [];
    } else {
      this.provinciasAcompanante = [];
      this.distritosAcompanante = [];
    }
    this.formAcompanante.controls['provincia'].setValue('');
    this.formAcompanante.controls['ubigeo'].setValue('');
  }

  seleccionarDistritoAcompanante(id?: string) {
    let idProvincia =
      id != undefined ? id : this.formAcompanante.value.provincia;
    if (idProvincia !== '') {
      this.distritosAcompanante =
        this.provinciasAcompanante.find((element) => {
          return element.id === idProvincia;
        })?.distritos || [];

      this.distritosAcompanante.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
    } else {
      this.distritosAcompanante = [];
    }
    this.formAcompanante.controls['ubigeo'].setValue('');
  }

  seleccionarProvinciaPaciente(id?: string) {
    let idDepartamento =
      id != undefined ? id : this.formPaciente.value.departamento;
    if (idDepartamento !== '') {
      this.provinciasPaciente =
        this.departamentos.find((element) => {
          return element.id === idDepartamento;
        })?.provincias || [];
      this.provinciasPaciente.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
      this.distritosPaciente = [];
    } else {
      this.provinciasPaciente = [];
      this.distritosPaciente = [];
    }
    this.formPaciente.controls['provincia'].setValue('');
    this.formPaciente.controls['distrito'].setValue('');
  }

  seleccionarDistritoPaciente(id?: string) {
    let idProvincia = id != undefined ? id : this.formPaciente.value.provincia;
    if (idProvincia !== '') {
      this.distritosPaciente =
        this.provinciasPaciente.find((element) => {
          return element.id === idProvincia;
        })?.distritos || [];
      this.distritosPaciente.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
    } else {
      this.distritosPaciente = [];
    }
    this.formPaciente.controls['distrito'].setValue('');
  }
}
