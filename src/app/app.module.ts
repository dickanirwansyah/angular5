import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModules } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { MatakuliahComponent } from './matakuliah/matakuliah.component';
import { JurusanComponent } from './jurusan/jurusan.component';
import { MahasiswaComponent } from './mahasiswa/mahasiswa.component';
import { HomeComponent } from './home/home.component';

import { MatakuliahService } from './matakuliah/matakuliah.service';
import { JurusanService } from './jurusan/jurusan.service';

@NgModule({
  declarations: [
    AppComponent,
    MatakuliahComponent,
    JurusanComponent,
    MahasiswaComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModules,
    ModalModule.forRoot()
  ],
  providers: [
    JurusanService,
    MatakuliahService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
