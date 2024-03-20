import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SexoService {
  constructor(public HttpClient: HttpClient) {}
  listarSexo() {
    let url = `http://localhost:8080/api/sexo`;
    return this.HttpClient.get(url).pipe(map((res: any) => res));
  }
}
