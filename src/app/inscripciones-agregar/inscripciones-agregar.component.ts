import { Component, OnInit } from '@angular/core';
import {Cliente, Precios} from "../models";
import {ClientesService} from "../services/clientes.service";
import {PreciosService} from "../services/precios.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-inscripciones-agregar',
  templateUrl: './inscripciones-agregar.component.html',
  styleUrls: ['./inscripciones-agregar.component.css']
})
export class InscripcionesAgregarComponent implements OnInit {

  clienteId: string = '';
  clienteNombre: string = '';
  cliente: Cliente;

  precioId: string;
  precio: Precios;
  precios: Precios[];

  fechaInicial = new FormControl();
  total: number;

  constructor(private clientesService: ClientesService,
              private preciosService: PreciosService
              ) { }

  ngOnInit(): void {

    this.getPrecios();
  }

  fun(id:string){
    this.clienteId = id;
    this.clientesService.get(id).subscribe(res => {
      this.cliente = res;
      this.clienteNombre = `${this.cliente.nombre} ${this.cliente.apellido}`;
      console.log(this.cliente);
    })

  }

  getPrecios(){
    this.preciosService.getAll().subscribe(res => {
      this.precios = res;
    })
  }

  seleccionarPrecio(id:string){
    this.fechaInicial.setValue(new Date());
    this.precio = this.precios.find(x => x.id == id) as Precios;
    console.log(this.precio);
    this.total = this.precio.costo;
  }

  onSubmit(){
    console.log(this.precioId);
  }

}
