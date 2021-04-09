import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DemandeClientService {

//   constructor(private http: HttpClient) {}

// //   getProducts(): Observable<any> {
// //     let url: string = "http://localhost:3000/products";
// //     let observable: Observable<any> =
// //       this.http.get(url);
// //     return observable;
// //   }

//   setFormulaireClient(formulaireForm: FormGroup, perimetreForm: FormGroup): Observable<any> {
//     const url = 'http://localhost:3000/formulaireclient';
//     const data = { formulaireForm: formulaireForm.value, perimetreForm: perimetreForm.value };

//     // console.log(JSON.stringify(data));
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json'
//       })
//     };
//     const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
//     return observable;
//   }

//   setFormulaireAdmin(IdDemande: string, sousetapeForm: FormGroup): Observable<any> {
//     const url = 'http://localhost:3000/formulaireadmin/' + IdDemande;
//     const data = { formulaireAdmin: sousetapeForm.value};

//     // console.log(JSON.stringify(data));
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json'
//       })
//     };
//     const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
//     return observable;
//   }

//   getFormulaireAdmin(IdDemande: string): Observable<any> {
//     const url: string = 'http://localhost:3000/formulaireadmintab/' + IdDemande;
//     // const httpOptions = {
//      // headers: new HttpHeaders({
//        // 'Content-Type': 'application/json'
//      // })
//    // };
//     const observable: Observable<any> =
//     this.http.get(url);
//     return observable;
//   }


//   setDeleteFormulaire(IdLigne: string, IdDemande: string): Observable<any> {
//     const url = 'http://localhost:3000/deleteligneform';
//     const data = { idLigne: IdLigne, idDemande : IdDemande };

//     // console.log(JSON.stringify(data));
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json'
//       })
//     };
//     const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
//     return observable;
//   }
}
