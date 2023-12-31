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
      if (response && response.cuitExists != null) {
        return response; 
      }
      return { cuitExists: false }; 
    }),
    catchError(error => {
      console.error('Error al verificar el CUIT:', error);
      return of({ cuitExists: false });
    })
  );
};

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
