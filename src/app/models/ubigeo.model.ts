export interface Departamento {
  id: string;
  nombre: string;
  provincias: Provincia[];
}

export interface Provincia {
  id: string;
  nombre: string;
  distritos: Distrito[];
}

export interface Distrito {
  id: string;
  nombre: string;
  ubigeo: string;
}
