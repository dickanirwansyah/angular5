import { Component, OnInit } from '@angular/core';
import { MatakuliahService } from './matakuliah.service';
import { JurusanService } from '../jurusan/jurusan.service';
import { Matakuliah } from './matakuliah';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TemplateRef } from '@angular/core';
import { Jurusan } from '../jurusan/jurusan';

@Component({
  selector: 'app-matakuliah',
  templateUrl: './matakuliah.component.html',
  styleUrls: ['./matakuliah.component.css']
})
export class MatakuliahComponent implements OnInit {

  title = "Data Matakuliah"
  Matakuliahs:Array<Object> = [];
  Jurusans = []
  statusCode: number
  requestProcessing = false
  IdMataKuliahToUpdate = null
  modalref: BsModalRef
  processValidation = false
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  }

  constructor(
    private serviceMatakuliah:MatakuliahService,
    private serviceJurusan:JurusanService,
    private modalService:BsModalService
  ){}

  ngOnInit():void {
    this.getListMatakuliahComponent()
    this.getListJurusan()
  }

  preProcessConfiguration(){
    this.statusCode = null,
    this.requestProcessing = true
  }

  //open modal
  openModalMatkul(templateMatakuliah:TemplateRef<any>){
    this.modalref = this.modalService.show(
      templateMatakuliah,
      Object.assign({}, this.config, {class: 'gray modal-lg'})
    )
    this.IdMataKuliahToUpdate=null
    this.matakuliahForm.reset()
  }

  matakuliahForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    jumlahsks: new FormControl('', Validators.required),
    jurusan: new FormControl('', Validators.required)
  })

  getListMatakuliahComponent(){
    this.serviceMatakuliah.getListMatakuliah()
    .subscribe(data => this.Matakuliahs = data,
    errorCode => this.statusCode = errorCode)
  }

  //*ngFor untuk menampilkan select option
  getListJurusan(){
    this.serviceJurusan.getListJurusan()
    .subscribe(data => this.Jurusans = data,
    errorCode => this.statusCode = errorCode)
  }



  //handling save dan edit jurusan
  onSubmited(){
    this.processValidation = true;
    if(this.matakuliahForm.invalid){
      return;
    }
    this.preProcessConfiguration()
    let name = this.matakuliahForm.get('name').value
    let description = this.matakuliahForm.get('description').value
    let jumlahsks = this.matakuliahForm.get('jumlahsks').value
    let jurusan = this.matakuliahForm.get('jurusan').value
    if(this.IdMataKuliahToUpdate === null){
      let matakuliah = new Matakuliah(null, name, description, jumlahsks, jurusan)
      this.serviceMatakuliah.getInsertMatakuliah(matakuliah)
      .subscribe(successCode => {
          this.statusCode = successCode
          this.getListMatakuliahComponent()
          this.modalref.hide()
      },errorCode => this.statusCode = errorCode)
    }else{
      let matakuliah = new Matakuliah(this.IdMataKuliahToUpdate, name, description, jumlahsks, jurusan)
      this.serviceMatakuliah.getUpdateMatakuliah(matakuliah)
      .subscribe(successCode => {
        this.statusCode = successCode
        this.getListMatakuliahComponent()
        this.modalref.hide()
      }, errorCode => this.statusCode = errorCode)
    }
  }

  getDeleteMatakuliahComponent(idmatakuliah:string){
    if(confirm('yakin ingin menghapus data ini '+idmatakuliah+ '?')){
      this.serviceMatakuliah.getDeleteMatakuliah(idmatakuliah)
      .subscribe(successCode => {
        this.statusCode = successCode
        this.getListMatakuliahComponent()
      }, errorCode => this.statusCode = errorCode)
    }
  }

  getIdMatakuliahComponent(idmatakuliah:string){
    this.serviceMatakuliah.getFindIdmatakuliah(idmatakuliah)
    .subscribe(resultsetMatakuliah => {
      this.IdMataKuliahToUpdate = resultsetMatakuliah.idmatakuliah
      this.matakuliahForm.get('name').setValue(resultsetMatakuliah.name)
      this.matakuliahForm.get('description').setValue(resultsetMatakuliah.description)
      this.matakuliahForm.get('jumlahsks').setValue(resultsetMatakuliah.jumlahsks)
      this.matakuliahForm.get('jurusan').setValue(resultsetMatakuliah.jurusan)
    }, errorCode => this.statusCode = errorCode)
  }

}
