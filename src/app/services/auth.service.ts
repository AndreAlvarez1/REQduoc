import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  estaAutenticado(): boolean {

    if (!localStorage.getItem('paramsDuoc')){
      return false;
    }

    const user = JSON.parse(localStorage.getItem('paramsDuoc')).user

    if ( user.email.length > 6  && user.nivelu > 1) {
      return true;
    } else {
      return false;
    }

  }


}
