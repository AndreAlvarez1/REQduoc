import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ParamsModel } from 'src/app/models/params.model';
import { UserModel } from 'src/app/models/user.model';
import { ConectorService } from 'src/app/services/conector.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();
  loading = false;
  paramsDuoc: ParamsModel = new ParamsModel()
  constructor(private conex: ConectorService,
              private router: Router) { }

  ngOnInit(): void {
    this.conex.logOut();
  }

  login(f:NgForm){
    if (f.invalid){
      this.error('Rellena ambos campos por favor')
      return;

    }
    console.log('usuario', this.user)

    this.conex.getDatos(`/userId/${this.user.CLAVE}`)
              .subscribe( resp => { 
                  console.log('resp', resp['datos']);
                  if (resp['datos'].length > 0){
                    const newUser = resp['datos'][0]
  
                    if (this.user.CLAVE === newUser.CLAVE ){
  
                      console.log('correcto,',newUser)

                      this.paramsDuoc.user = {
                              codigo: newUser.CODIGO,
                              nombre: newUser.NOMBRE,
                              nivelu: newUser.NIVELU,
                              email: newUser.EMAIL,
                      }
  
                      localStorage.setItem('paramsDuoc', JSON.stringify(this.paramsDuoc));
  
                      this.exito('');
                      this.router.navigateByUrl('/requerimientos')                   
                    } else {
                      this.error('Password incorrecto')
                    }
                  } else {
                    this.error('Revisa el correo por favor o la contraseña')
                  }
                  this.loading = false;
                });
  }


  exito(mensaje){
    Swal.fire({
      title: 'Exito!',
      text: mensaje,
      icon: 'success',
      confirmButtonText: 'Cool'
    })
  }
 
  error(mensaje){
    Swal.fire({
      title: 'Error!',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }
}
