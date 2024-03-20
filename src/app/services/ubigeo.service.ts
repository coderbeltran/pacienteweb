import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UbigeoService {
  constructor(public http: HttpClient) {}

  listarUbigeo() {
    let url = `http://localhost:8080/api/ubigeo`;
    return this.http.get(url).pipe(map((res: any) => res));
  }
}
