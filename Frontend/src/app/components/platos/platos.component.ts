import { Component, OnInit } from '@angular/core';
import { Plato } from 'src/app/models/plato';
import { PlatoService } from 'src/app/services/plato.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.css'],
  providers: [PlatoService]
})
export class PlatosComponent implements OnInit {
  public titulo:String
  public platos:Plato[];
  public url:String;

  constructor(
    private _platoService:PlatoService
  ) { 
    this.titulo="Lista de Platos"
    this.platos=[]
    this.url=Global.url
  }

  ngOnInit(): void {
    this.getPlatos()
  }

  getPlatos(){
    this._platoService.getPlatos().subscribe(
      response=>{
        if(response.platos){
          this.platos=response.platos
        }
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

}
