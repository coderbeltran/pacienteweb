export class TipoDocumento {
  constructor(
    public idTipoDocumentoIdentidad: number,
    public descripcionTipoDocumentoIdentidad: string,
    public codigoIeds: string,
    public estado: boolean
  ) {}
}
