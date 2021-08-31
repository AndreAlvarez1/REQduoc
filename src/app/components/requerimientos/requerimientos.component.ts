import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConectorService } from 'src/app/services/conector.service';

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.css']
})
export class RequerimientosComponent implements OnInit {

  loading = false;
  searchString: string;
  
  tiendas = [];
  tienda: 'todas'
  reqsAll = [];
  reqs = [];


  constructor(private conex: ConectorService,
              private router: Router) { 
    this.getTiendas();
    this.getRequerimientos();
  }

  ngOnInit(): void {
  }


  info(){
    console.log('tiendas', this.tiendas);
    console.log('reqs', this.reqs);
  }
  getTiendas(){
    this.loading = true;
    this.conex.getDatos('/generales/TIENDAS')
              .subscribe( resp => { 
                this.tiendas = resp['datos'];

              })
  }
  
  getRequerimientos(){
    this.conex.getDatos(`/requerimientos/0`)
              .subscribe( resp => { 
                this.reqsAll = resp['datos'];
                this.reqs = this.reqsAll;
                this.loading= false;
              })
  }

  selectReq(r){
    console.log('req',r);
    this.router.navigateByUrl(`/requerimiento/${r.id}`);
  }

}
