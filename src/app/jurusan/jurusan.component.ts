import { Component, OnInit, TemplateRef } from '@angular/core';
import { JurusanService } from './jurusan.service';
import { Jurusan } from './jurusan';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-jurusan',
  templateUrl: './jurusan.component.html',
  styleUrls: ['./jurusan.component.css']
})
export class JurusanComponent implements OnInit {

  title = "Data Jurusan";
  Jurusans: Array<any>;
  statusCode: number;
  modalRef: BsModalRef;
  requestProcessing = false;
  IdjurusanToUpdate = null;
  processValidation = false;

  constructor(
    private serviceJurusan: JurusanService,
    private modalService: BsModalService) { }

  ngOnInit():void {
    this.getListJurusanComponent()
  }

  //forms
  jurusanForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  //modal ngx-bootstrap modal
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.IdjurusanToUpdate = null;
    this.jurusanForm.reset();

  }

  //process configuration form Validators
  preProcessConfiguration(){
    this.statusCode = null;
    this.requestProcessing = true;
  }

  //list jurusan component
  getListJurusanComponent(){
    this.serviceJurusan.getListJurusan()
    .subscribe(data => this.Jurusans = data,
    errorCode => this.statusCode = errorCode);
  }

  //on handling save & update
  onHandlingSubmitComponent(){
    this.processValidation = true;
    if(this.jurusanForm.invalid){
      return;
    }
    this.preProcessConfiguration();
    let name = this.jurusanForm.get('name').value.trim()
    let description = this.jurusanForm.get('description').value.trim()

    if(this.IdjurusanToUpdate === null){
      let jurusan = new Jurusan(null, name, description);
      this.serviceJurusan.getInsertJurusan(jurusan)
      .subscribe(successCode => {
          this.statusCode = successCode
          this.getListJurusanComponent()
          this.modalRef.hide()
      }, errorCode => this.statusCode = errorCode);
    }else{
      let jurusan = new Jurusan(this.IdjurusanToUpdate, name, description);
      this.serviceJurusan.getUpdateJurusan(jurusan)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getListJurusanComponent()
        this.modalRef.hide()
      }, errorCode => this.statusCode = errorCode)
    }
  }

  //delete jurusan
  getDeleteJurusan(idjurusan:string){
      if(confirm('yakin ingin hapus data ini?')){
        this.serviceJurusan.getDeleteIdjurusan(idjurusan)
        .subscribe(succcessCode => {
          this.statusCode = succcessCode
          this.getListJurusanComponent()
        }, errorCode => this.statusCode = errorCode)
      }
  }

  //get show for edit data
  getShowDataForEdit(idjurusan:string){
    this.preProcessConfiguration();
    this.serviceJurusan.getIdJurusan(idjurusan)
      .subscribe(jurusan => {
          this.IdjurusanToUpdate = jurusan.idjurusan;
          this.jurusanForm.setValue({
            name: jurusan.name,
            description: jurusan.description
          });
          this.processValidation = true;
          this.requestProcessing = false;
      }, errorCode => this.statusCode = errorCode)
  }
}
