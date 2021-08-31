import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConectorService {
  // public url = 'http://node.clubgournet.cl:9091'
  public url = 'http://localhost:9092';

  constructor(private http:HttpClient,
              private router: Router) { }

  getDatos( ruta:string ) {
      return this.http.get( this.url + ruta );
  }
              
  guardarDato(ruta:string, body:any) {
      return this.http.post( this.url + ruta, body );
  }


  // validarUser(id, type, acceso){
  //   this.getDatos('/userId/' + id).subscribe( resp => {
  //         const newU = resp['datos'][0];
  //           if (newU.type !== type){
  //             localStorage.removeItem('params');
  //             this.router.navigateByUrl('/login')
  //           } else {
  //             if (acceso === 'dios' && type < 4){
  //               this.router.navigateByUrl('/login')
  //               console.log('acceso para dioses')
  //             }
             
  //             if (acceso === 'admin' && type < 3){
  //               this.router.navigateByUrl('/login')
  //               console.log('acceso para admins')
  //             }
             
  //             if (acceso === 'profe' && type < 2){
  //               this.router.navigateByUrl('/login')
  //               console.log('acceso para profes')
  //             }
  
  //             console.log('se puede acceder');
  //           }
  //   })
  // }
  
  
  logOut(){
    localStorage.removeItem('paramsDuoc');
    this.router.navigateByUrl('/login');
  }

            
}
