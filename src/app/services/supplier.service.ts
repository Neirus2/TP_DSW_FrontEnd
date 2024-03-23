import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
 private URL = 'http://localhost:3000/api';
  constructor (    
      private http: HttpClient,
      private router: Router
              ) { }

    createNewSupplier(supplierData: any): Observable<any> {
    return this.http.post<any>(this.URL + '/createNewSupplier', supplierData);
                                                          };
getSupplierCuit(cuit: string): Observable<any> {
    console.log('Este es el CUIT ingresado', cuit);
    return this.http.get<any>(this.URL + `/supplier/${cuit}`).pipe(
      map(response => {
        if (response) {
          console.log(response);
          return response; // Devuelve directamente los valores del proveedor
        }
        return null; // Devuelve null si no se encuentra el proveedor
      }),
      catchError(error => {
        console.error('Error al verificar el CUIT:', error);
        return of(null); // Devuelve null en caso de error
      })
    );
  }

async searchSuppliers(query: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    
    this.http.get<any>(this.URL + `/supplier/${query}`).subscribe(
      {
        next:response => {
              if (response) {
                console.log('Proveedor encontrado:', response);
                const supplier = response;
                resolve(supplier); 
            } else {
                console.log('Proveedor no encontrado');
                reject('Proveedor no encontrado'); 
                   }
                        },
        error:error => {
                  console.error('Error en la solicitud HTTP', error);
                  reject(error);
                     }
      }
    );
  });
}

  deleteSupplier(supplierId:string){ 
    const url = `${this.URL}/deleteSupplier/${supplierId}`;         
    return this.http.delete(url);
  };
updateDetails(supplierId: string, details: { address: string, phoneNumber: string }): Observable<any> {
    const url = `${this.URL}/updateDetails/details/${supplierId}`;
    return this.http.patch(url, details);
  };

  obtenerSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/getSuppliers`);
  };
}
