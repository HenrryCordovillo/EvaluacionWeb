import { Component, OnInit } from '@angular/core';
import { CargarService } from 'src/app/services/cargar.service';
import { PlatoService } from 'src/app/services/plato.service';
import { Plato } from 'src/app/models/plato';
import { Global } from 'src/app/services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-plato',
  templateUrl: '../crear-plato/crear-plato.component.html',
  styleUrls: ['./editar-plato.component.css'],
  providers:[PlatoService,CargarService]
})
export class EditarPlatoComponent implements OnInit {
  public titulo:String;
  public plato:Plato;
  public url:String;
  public platoGuardar:Plato;
  public archivosParaCargar:Array<File>

  constructor(
    private _platoService:PlatoService,
    private _cargarService:CargarService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 
    this.url=Global.url;
    this.titulo="Editar el Plato"
    this.plato=new Plato('','','','',0,'')
    this.platoGuardar=new Plato('','','','',0,'')
    this.archivosParaCargar=[];
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id=params.id;
      this.getPlato(id);
    });
  }


  getPlato(id:String){
    this._platoService.getPlato(id).subscribe(
      response=>{
        this.plato=response.plato;
      },
      error=>{
        console.log(<any>error)
      }
      
    )
  }

  guardarPlato(form:NgForm){
    this._platoService.updatePlato(this.plato).subscribe(
      response=>{
        if(response.plato){
          if(this.archivosParaCargar){
            this._cargarService.peticionRequest(Global.url+"subir-imagen/"+response.plato._id,[],this.archivosParaCargar,'imagen')
            .then((result:any)=>{
              this.platoGuardar=result.response;
              form.reset();
              // this.fileInput.nativeElement.value='';
            });
          }else{
            this.platoGuardar=response.plato;
            form.reset();
          }
          }else{
            console.log("error")
          }
        },
        error=>{
          console.log("error");
        }
      
    )
  }

  imagenChangeEvent(archivoSeleccionado:any){

    this.archivosParaCargar=<Array<File>>archivoSeleccionado.target.files;

  }

}
