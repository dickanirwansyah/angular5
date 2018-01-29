import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JurusanComponent } from './jurusan/jurusan.component';
import { MatakuliahComponent } from './matakuliah/matakuliah.component';
import { MahasiswaComponent } from './mahasiswa/mahasiswa.component';
import { HomeComponent } from './home/home.component';

const routes: Routes =[
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'data/jurusan',
    component: JurusanComponent
  },
  {
    path: 'data/matakuliah',
    component: MatakuliahComponent
  },
  {
    path: 'data/mahasiswa',
    component: MahasiswaComponent
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModules{}
