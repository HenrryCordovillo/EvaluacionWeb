import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/services/global';
import { Plato } from 'src/app/models/plato';
import { PlatoService } from 'src/app/services/plato.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-plato',
  templateUrl: './detalle-plato.component.html',
  styleUrls: ['./detalle-plato.component.css'],
  providers:[PlatoService]
})
export class DetallePlatoComponent implements OnInit {
  public titulo:String
  public url: String
  public plato:Plato


  constructor(
    private _platoService: PlatoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.titulo="Detalle del Plato"
    this.url = Global.url;
    this.plato = new Plato("","","","",0,"")
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      let id = params.id;

      this.getPlato(id);
    });
  }

  getPlato(id: String) {
    this._platoService.getPlato(id).subscribe(
      (response) => {
        this.plato = response.plato;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  borrarPlato(id:String){
    this._platoService.deletePlato(id).subscribe(
      (response)=>{
        if(response.plato){
          this._router.navigate(['/platos']);
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
