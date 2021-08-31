import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredienteModel } from 'src/app/models/ingrediente.model';
import { ReqModel } from 'src/app/models/req.model';
import { ConectorService } from 'src/app/services/conector.service';

@Component({
  selector: 'app-requerimiento',
  templateUrl: './requerimiento.component.html',
  styleUrls: ['./requerimiento.component.css']
})
export class RequerimientoComponent implements OnInit {

  loading = false;
  loadingAsignaturas = false;
  loadingProductos = false;

  id: any = '';
  req: ReqModel = new ReqModel();
  ingrediente: IngredienteModel = new IngredienteModel();

  tienda: any;
  tiendas = [];
  asignaturas = [];
  productos = [];


  constructor(private conex: ConectorService,
              private router: Router,
              private route: ActivatedRoute) { 
                this.id = this.route.snapshot.paramMap.get('id') || '';
                if (this.id !== 'nuevo'){
                    this.getRequerimiento();
                  }
                this.getTiendas();
              }

  ngOnInit(): void {
  }

  info(){
    console.log('tiendas', this.tiendas);
    console.log('asignaturas', this.asignaturas);
    console.log('productos', this.productos);
    console.log('req', this.req);
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
    this.conex.getDatos(`/generalesXtienda/ASIGNATURAS/${tiendaid}`).subscribe( resp => { this.asignaturas = resp['datos'];this.loadingAsignaturas = false})
  }

  getRequerimiento(){
    this.conex.getDatos(`/requerimiento/${this.id}`).subscribe( resp => { this.req = resp['datos'][0]})

  }


  selectTienda(t){
    console.log('tienda', t);
  }

  selectAsignatura(a){
    console.log('asignatura', a);
  }

  guardarENC(f: NgForm){
    if( f.invalid){
      return;
    }

    console.log('req', this.req);

  }
}
