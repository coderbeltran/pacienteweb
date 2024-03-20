import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TipoDocumentoService {
  constructor(public http: HttpClient) {}

  listarTipoDocumento() {
    let url = `http://localhost:8080/api/tipodocumento`;
    return this.http.get(url).pipe(map((res: any) => res));
  }
}
