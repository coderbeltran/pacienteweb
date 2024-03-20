import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParentescoService {
  constructor(public HttpClient: HttpClient) {}
  listarParentesco() {
    let url = `http://localhost:8080/api/parentesco`;
    return this.HttpClient.get(url).pipe(map((res: any) => res));
  }
}
