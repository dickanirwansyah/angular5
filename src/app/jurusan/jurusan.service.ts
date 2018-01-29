import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Jurusan } from './jurusan';

@Injectable()
export class JurusanService{

  URI_JURUSAN = "/jurusan/";

  constructor(private _http:Http){}

  //return data json
  private getDataJson(res:Response){
    let body = res.json();
    return body;
  }

  //handling error
  private getHandlingError(error:Response | any){
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

  //list jurusan
  public getListJurusan():Observable<Jurusan[]>{
    return this._http.get(this.URI_JURUSAN)
    .map(this.getDataJson);
  }

  //insert jurusan
  getInsertJurusan(jurusan: Jurusan):Observable<number>{
    let cpHeaders = new Headers({'Content-type': 'application/json'})
    let options = new RequestOptions({headers: cpHeaders})
    return this._http.post(this.URI_JURUSAN+"create", jurusan, options)
    .map(success => success.status).catch(this.getHandlingError)
  }

  //update jurusan
  getUpdateJurusan(jurusan: Jurusan):Observable<number>{
    let cpHeaders = new Headers({'Content-type': 'application/json'})
    let options = new RequestOptions({headers: cpHeaders})
    return this._http.post(this.URI_JURUSAN+"update", jurusan, options)
    .map(success => success.status).catch(this.getHandlingError)
  }

  //get id jurusan
  public getIdJurusan(idjurusan: string):Observable<Jurusan>{
    let cpHeaders = new Headers({'Content-type': 'application/json'});
    let cpParams = new URLSearchParams();
    cpParams.set('idjurusan', idjurusan);
    let options = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this._http.get(this.URI_JURUSAN+'find?'+idjurusan, options)
    .map(this.getDataJson).catch(this.getHandlingError);
  }

  //get delete jurusan
  public getDeleteIdjurusan(idjurusan: string):Observable<number>{
    let cpHeaders = new Headers({'Content-type': 'application/json'})
    let cpParams = new URLSearchParams()
    cpParams.set('idjurusan', idjurusan)
    let options = new RequestOptions({headers:cpHeaders, params:cpParams})
    return this._http.delete(this.URI_JURUSAN+"delete"+"/"+idjurusan, options)
    .map(success => success.status).catch(this.getHandlingError)
  }
}
