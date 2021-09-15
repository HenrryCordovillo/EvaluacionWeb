import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CargarService } from 'src/app/services/cargar.service';
import { Plato } from 'src/app/models/plato';
import { PlatoService } from 'src/app/services/plato.service';
import { Global } from 'src/app/services/global';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-crear-plato',
  templateUrl: './crear-plato.component.html',
  styleUrls: ['./crear-plato.component.css'],
  providers: [PlatoService, CargarService]
})
export class CrearPlatoComponent implements OnInit {
  public titulo:String;
  public plato:Plato;
  public platoGuardar:Plato;
  public url:String;
  public archivosParaCargar:Array<File>;
  @ViewChild('fileInput') fileInput:any; 

  constructor(
    private _platoService:PlatoService,
    private _cargarService:CargarService
  ) { 
    this.titulo="Guardar Auto"
    this.url=Global.url
    this.plato=new Plato("","","","",0,"")
    this.platoGuardar= new Plato("","","","",0,"")
    this.archivosParaCargar=[]
  }

  ngOnInit(): void {
  }

  guardarPlato(form:NgForm){
    this._platoService.guardarPlato(this.plato).subscribe(
      response=>{
        if(response.plato){
          if(this.archivosParaCargar){
            this._cargarService.peticionRequest(Global.url+"subir-imagen/"+response.plato._id,[],this.archivosParaCargar,'imagen')
            .then((result:any)=>{
              this.platoGuardar=result.response;
              form.reset();
              this.fileInput.nativeElement.value='';
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
