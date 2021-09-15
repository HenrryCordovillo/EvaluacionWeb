import { Injectable } from "@angular/core";
import { Global } from "./global";
@Injectable()
export class CargarService{
    public url:String;
    constructor(){
        this.url=Global.url;
    }
    // Crear metodo para hacer una peticion ajax para adjuntar un archivo pasaremos la url, los posibles parametros en nuestro caso un array de archivos y el nombre del archivo

    peticionRequest(url:string,params:Array<string>,files:Array<File>,nombre:string){
        return new Promise(function(resolve,reject){
            var formDatos:any= new FormData() //Simulacion de formulario de objeto
            var xhr=new XMLHttpRequest(); //xhr es sinonimo de ajax que contiene una peticion de tipo asincrono de javascript
            // recorrer todos los archivos que lleguen, adjuntar al formulario con el nombre que tiene
            for(var i = 0;i<files.length;i++){
                formDatos.append(nombre,files[i],files[i].name);
            }
            // verifica cuando se produce un cambio
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4){
                    if(xhr.status==200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response)
                    }
                }
            }
            xhr.open('POST',url,true);//petiion por post y true para realizar la perticion
            xhr.send(formDatos);
        })
    }
}