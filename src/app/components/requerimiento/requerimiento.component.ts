import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredienteModel } from 'src/app/models/ingrediente.model';
import { ParamsModel } from 'src/app/models/params.model';
import { ReqModel } from 'src/app/models/req.model';
import { ConectorService } from 'src/app/services/conector.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-requerimiento',
  templateUrl: './requerimiento.component.html',
  styleUrls: ['./requerimiento.component.css']
})
export class RequerimientoComponent implements OnInit {

  loading = false;
  loadingAsignaturas = false;
  loadingProductos = false;
  loadingDetalle = false;

  searchString: string;

  id: any = '';
  req: ReqModel = new ReqModel();
  ingrediente: IngredienteModel = new IngredienteModel();
  paramsDuoc: ParamsModel = new ParamsModel();

  tienda: any;
  tiendas = [];
  asignaturas = [];
  productos = [];
  detalle = [];

  modalInsumo = false;


  constructor(private conex: ConectorService,
              private router: Router,
              private route: ActivatedRoute) { 
                this.id = this.route.snapshot.paramMap.get('id') || '';
                

                if (localStorage.getItem('paramsDuoc')){
                  this.paramsDuoc = JSON.parse(localStorage.getItem('paramsDuoc'))
                }
                
                
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
    console.log('detalle', this.detalle);
  }

  getTiendas(){
    this.loading = true;
    this.conex.getDatos('/generales/TIENDAS')
              .subscribe( resp => { 
                  this.tiendas = resp['datos'];
                  this.tienda = this.tiendas[0]; 
                  this.getAsignaturas(this.tienda.id)
                  this.getProductos(this.tienda.id);
                  this.loading = false;})
  }

  getAsignaturas(tiendaid){
    console.log('aca', tiendaid)
    this.loadingAsignaturas = true;
    this.conex.getDatos(`/generalesXtienda/ASIGNATURAS/${tiendaid}`).subscribe( resp => { this.asignaturas = resp['datos'];this.loadingAsignaturas = false})
  }

  getRequerimiento(){
    this.conex.getDatos(`/requerimiento/${this.id}`)
              .subscribe( resp => { 
                this.req = resp['datos'][0]; 
                this.getDetalle(this.id);
                
              })

  }
  
  getDetalle(reqid){
    this.loadingDetalle = true;
    this.conex.getDatos(`/detalle/${reqid}`).subscribe( resp => { this.detalle = resp['datos']; this.loadingDetalle = false;})

  }

  getProductos(tiendaid){
    console.log('productos', tiendaid)
    this.loadingProductos = true;
    this.conex.getDatos(`/productos/${tiendaid}`).subscribe( resp => { this.productos = resp['datos'];this.loadingProductos = false})
  }
  


  selectTienda(t){
    console.log('tienda', t);
  }

  selectAsignatura(a){
    console.log('asignatura', a);
    this.req.ASIGNATURAID = Number(a);
  }

  guardarENC(f: NgForm){
    if( f.invalid){
      return;
    }

    if(this.req.ASIGNATURAID == 0){
      this.error('Debes escoger una asignatura por favor');
      return;
    }
    
    if(this.req.NUMSEMANA < 1 || this.req.NUMSEMANA > 52){
      this.error('Debes escoger una semana entre 1 y 52');
      return;
    }

    this.req.TIENDAID = this.tienda.id;
    this.req.USERID = this.paramsDuoc.user.codigo;

    let tarea = 'update';

    if (this.id === 'nuevo'){
      tarea = 'insert';
    }
    
    console.log('req', this.req);

    this.loading = true;
    this.conex.guardarDato(`/post/ENCREQ/${tarea}`, this.req)
              .subscribe( resp => { 
                this.loading = false;

                const info = resp['datos'];
                console.log('guardé encabezado de req', info)
                
                if (tarea === 'insert'){
                  console.log('id', info.insertId);
                  this.router.navigateByUrl(`/requerimiento/${info.insertId}`);
                }


              });


  

  }


  selectProducto(p){
    console.log('p', p);


    const existe = this.detalle.find( ing => ing.CODIGO === p.CODIGO)
    if (existe){
          console.log('existe', existe);
          this.ingrediente = existe;
        } else {
              this.ingrediente = { 
                                  id: 0,
                                  ENCREQID: this.id,
                                  CODIGO: p.CODIGO,
                                  CANTIDAD: 0, 
                                  UNIDAD: p.UNIDAD,
                                  status: 1,
                                  DESCRIPCIO: p.DESCRIPCIO
                                  }
       }
    //  this.modalInsumo = true;
    this.defineCantidad(this.ingrediente.DESCRIPCIO, this.ingrediente.UNIDAD, this.ingrediente.CANTIDAD)

  }





  editarIngrediente(value){
    console.log('editar', value);
    this.ingrediente = value;
    // this.modalInsumo = true;
    this.defineCantidad(this.ingrediente.DESCRIPCIO, this.ingrediente.UNIDAD, this.ingrediente.CANTIDAD)
  }
  
  guardarIngrediente(){
    if (this.ingrediente.CANTIDAD < 0){
      this.error('La cantidad debe ser mayor que 0');
      return;
    }
    
    
    let tarea = 'insert';
    if (this.ingrediente.id != 0){
      tarea = 'update'
    }

    console.log('ingrediente final', this.ingrediente);
    this.conex.guardarDato(`/post/DETREQ/${tarea}`, this.ingrediente)
              .subscribe( resp => { 
                console.log('guardé ingrediente', resp);
                if( tarea === 'insert'){
                  this.getDetalle(this.id);
                }
                this.modalInsumo = false;
              })
  }








  borrarIngrediente(value){
    console.log('borrar', value);
  }


  defineCantidad(producto, unidad, cantidad){
   

    Swal.fire({
      title: `${producto}  `,
      input: 'number',
      inputLabel: `Define la cantidad en ${unidad}`,
      inputValue: cantidad,
      showCancelButton: true,
      inputValidator: (value) => {
        
        if (!value) {
          return 'Tiene que poner un valor'
        }
        let cant = Number(value);
        if (cant < 0){
          return 'Define una cantidad mayor que 0 por favor'
        }

        this.ingrediente.CANTIDAD = Number(value);
        this.guardarIngrediente()
      }
    })
  }




// WARNINGS


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
