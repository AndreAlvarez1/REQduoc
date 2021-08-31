import { Component, OnInit } from '@angular/core';
import { ParamsModel } from 'src/app/models/params.model';
import { ConectorService } from 'src/app/services/conector.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  paramsDuoc : ParamsModel = new ParamsModel();

  constructor(public conex:ConectorService) { 

    if (localStorage.getItem('paramsDuoc')){
      this.paramsDuoc = JSON.parse(localStorage.getItem('paramsDuoc'))
    }
  }

  ngOnInit(): void {
  }

}
