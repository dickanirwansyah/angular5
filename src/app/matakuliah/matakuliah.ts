import { Jurusan } from '../jurusan/jurusan';

export class Matakuliah{
  constructor(
    public idmatakuliah: string,
    public name: string,
    public description: string,
    public jumlahsks: number,
    public jurusan:Jurusan
  ){}
}
