import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AsignaturaModel } from 'src/app/models/asignatura.model';
import { ParamsModel } from 'src/app/models/params.model';
import { ConectorService } from 'src/app/services/conector.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent implements OnInit {

  paramsDuoc: ParamsModel = new ParamsModel();
  asignatura: AsignaturaModel = new AsignaturaModel();
  tienda: any;
  searchString; string;

  tiendas = [];
  asignaturas = []
  loading = false;
  loadingAsignaturas = false;

  constructor(private conex:ConectorService) { 
    if (localStorage.getItem('paramsDuoc')){
      this.paramsDuoc = JSON.parse(localStorage.getItem('paramsDuoc'))
    }
    
    this.getTiendas();


  }

  ngOnInit(): void {
  }


  info(){
    console.log('asignaturas', this.asignaturas)
    console.log('asignatura', this.asignatura)

  }


  getTiendas(){
    this.loading = true;
    this.conex.getDatos('/generales/TIENDAS')
              .subscribe( resp => { 
                  this.tiendas = resp['datos'];
                  this.tienda = this.tiendas[0]; 
                  this.getAsignaturas(this.tienda.id)
                  this.loading = false;})
  }

  getAsignaturas(tiendaid){
    console.log('aca', tiendaid)
    this.loadingAsignaturas = true;
    this.conex.getDatos(`/generalesXtienda/ASIGNATURAS/${tiendaid}`)
                .subscribe( resp => { 
                    this.asignaturas = resp['datos'];
                    this.loadingAsignaturas = false})
  }


  selectTienda(t){
    console.log('tienda', t)
    this.tienda = t;
    this.getAsignaturas(this.tienda.id)
  }

  selectAsignatura(a){
    console.log('asig', a);
    this.asignatura = a;
  }


  limpiar(){
    this.asignatura = new AsignaturaModel();

  }


  guardar(f:NgForm){
    console.log('asignatura', this.asignatura);
    if (this.asignatura.ASIGNATURA.length < 1){
      return;
    }

    let tarea = 'update'

    if (this.asignatura.id === 0){
      tarea = 'insert'
      this.asignatura.TIENDAID = this.tienda.id;
    }
    
    this.conex.guardarDato('/post/ASIGNATURA/' + tarea, this.asignatura).subscribe( resp => {
        this.asignatura = new AsignaturaModel();
        this.getAsignaturas(this.tienda.id);
    })

  }

}
