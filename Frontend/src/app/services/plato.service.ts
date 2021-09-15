import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {  Observable } from "rxjs/Observable"
import { Plato } from "../models/plato";
import { Global } from "./global";

@Injectable()
export class PlatoService{
    public url:String;
    constructor(private _http:HttpClient){
        this.url=Global.url;
    }

    getPlatos():Observable<any>{
        let headers= new HttpHeaders().set('Content-Type','application/json')
        return this._http.get(this.url+'platos',{headers:headers})

    }

    guardarPlato(plato:Plato):Observable<any>{
        let params=JSON.stringify(plato);
        let headers= new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'guardarPlato',params,{headers:headers});
    }
    getPlato(id:String):Observable<any>{
        let headers= new HttpHeaders().set('Content-Type','application/json')
        return this._http.get(this.url+'plato/'+id,{headers:headers})

    }

    deletePlato(id:String):Observable<any>{
        let headers= new HttpHeaders().set('Content-Type','application/json')
        return this._http.delete(this.url+'plato/'+id,{headers:headers})

    }

}