import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BuscarPaciente } from '../models/buscarpaciente.model';
import { PacienteAcompanante } from '../models/registrarpaciente.model';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  constructor(public http: HttpClient) {}

  buscarPaciente(request: BuscarPaciente) {
    let url = `http://localhost:8080/api/pacientes?tipoDocide=${request.tipoDocide}&doc=${request.doc}&nombres=${request.nombres}&apellidos=${request.apellidos}`;
    return this.http.get(url).pipe(map((res: any) => res));
  }
  detallePciente(idPaciente: string) {
    let url = `http://localhost:8080/api/pacientes/${idPaciente}`;
    return this.http.get(url).pipe(map((res: any) => res));
  }

  registrarPaciente(paciente: PacienteAcompanante) {
    let url = `http://localhost:8080/api/pacientes`;
    return this.http.post(url, paciente).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500 || error.status === 400) {
          // Manejar errores 500 y 400 aquí
          console.error(
            'Error interno del servidor o solicitud incorrecta:',
            error.error
          );
        } else if (error.status === 200) {
          // Manejar errores 200 aquí si es necesario
          console.error(
            'Error: Respuesta inesperada del servidor:',
            error.error
          );
        }
        return throwError(
          'Ocurrió un error. Por favor, inténtalo de nuevo más tarde.'
        );
      })
    );
  }
  editarPaciente(paciente: PacienteAcompanante) {
    let url = `http://localhost:8080/api/pacientes`;
    return this.http.put(url, paciente).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500 || error.status === 400) {
          // Manejar errores 500 y 400 aquí
          console.error(
            'Error interno del servidor o solicitud incorrecta:',
            error.error
          );
        } else if (error.status === 200) {
          // Manejar errores 200 aquí si es necesario
          console.error(
            'Error: Respuesta inesperada del servidor:',
            error.error
          );
        }
        return throwError(
          'Ocurrió un error. Por favor, inténtalo de nuevo más tarde.'
        );
      })
    );
  }
  public url = 'http://localhost:8080/api/pacientes/';
  eliminarPaciente(idPaciente: number): Observable<any> {
    return this.http.delete(`${this.url}${idPaciente}`);
  }
}
