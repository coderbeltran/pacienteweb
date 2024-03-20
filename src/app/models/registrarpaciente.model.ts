export class Paciente {
  constructor(
    public idPaciente?: number,
    public tipoDocumento: number = 0,
    public documento: string = '',
    public apellidoPat: string = '',
    public apellidoMat: string = '',
    public nombres: string = '',
    public idSexo: number = 0,
    public fechaNacimiento: string = '',
    public lugarNacimiento: string = '',
    public direccion: string = '',
    public ubigeo: string = ''
  ) {}
}

export class Acompanante {
  constructor(
    public idPacienteAcompanante?: number,
    public idPaciente: number = 0,
    public tipoDocumento: number = 0,
    public documento: string = '',
    public apellidoPat: string = '',
    public apellidoMat: string = '',
    public nombres: string = '',
    public fechaNacimiento?: Date,
    public idParentesco: number = 0,
    public telefono: string = '',
    public direccion: string = '',
    public ubigeo: string = ''
  ) {}
}

export class PacienteAcompanante {
  constructor(public paciente: Paciente, public acompanante: Acompanante) {}
}
