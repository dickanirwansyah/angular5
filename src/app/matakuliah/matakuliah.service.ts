import { Injectable } from '@angular/core';
import { Matakuliah } from './matakuliah';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Response } from '@angular/http';

@Injectable()
export class MatakuliahService{

  URI_MATAKULIAH = "/matakuliah/"

  constructor(private http: Http){}

  //get data json
  private getDataJson(res:Response){
    let body = res.json();
    return body;
  }

  //get handling error
  private getHandlingError(error: Response | any){
    console.error(error.message || error)
    return Observable.throw(error.status)
  }

  //insert matakuliah
  public getInsertMatakuliah(matakuliah:Matakuliah):Observable<number>{
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers:cpHeaders})
    return this.http.post(this.URI_MATAKULIAH+'create', matakuliah, options)
    .map(success => success.status)
    .catch(this.getHandlingError)
  }

  //update matakuliah
  public getUpdateMatakuliah(matakuliah:Matakuliah):Observable<number>{
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers:cpHeaders})
    return this.http.post(this.URI_MATAKULIAH+'update', matakuliah, options)
    .map(success => success.status)
    .catch(this.getHandlingError)
  }

  //delete matakuliah
  public getDeleteMatakuliah(idmatakuliah:string):Observable<number>{
    let cpHeaders = new Headers({'Content-Type':'application/json'})
    let cpParams = new URLSearchParams();
    cpParams.set('idmatakuliah', idmatakuliah)
    let options = new RequestOptions({headers: cpHeaders, params:cpParams})
    return this.http.delete(this.URI_MATAKULIAH+'delete/'+idmatakuliah, options)
    .map(success => success.status).catch(this.getHandlingError)
  }

  //list matakuliah
  public getListMatakuliah():Observable<Matakuliah[]>{
    return this.http.get(this.URI_MATAKULIAH)
    .map(this.getDataJson)
  }

  //get idmatakuliah
  public getFindIdmatakuliah(idmatakuliah:string):Observable<Matakuliah>{
    let cpHeaders = new Headers({'Content-Type': 'application/json'})
    let cpParams = new URLSearchParams();
    cpParams.set('idmatakuliah', idmatakuliah)
    let options = new RequestOptions({headers:cpHeaders, params:cpParams})
      return this.http.get(this.URI_MATAKULIAH+idmatakuliah, options)
      .map(this.getDataJson).catch(this.getHandlingError)
  }
}
