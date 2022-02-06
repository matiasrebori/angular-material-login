import {Component, OnInit} from '@angular/core';
import {Precios} from "../models";
import {ClientesService} from "../services/clientes.service";
import {PreciosService} from "../services/precios.service";
import {InscripcionesService} from "../services/inscripciones.service";
import {FormControl} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-inscripciones-agregar',
  templateUrl: './inscripciones-agregar.component.html',
  styleUrls: ['./inscripciones-agregar.component.css']
})
export class InscripcionesAgregarComponent implements OnInit {
  // objeto a guardar
  inscripcion: any;
  // property binding HTML
  clienteId: string = '';
  precioId: string;
  clienteNombre: string = '';
  fechaInicial = new FormControl();
  fechaFinal: Date;
  precio: Precios;
  precios: Precios[];
  total: number;

  constructor(private clientesService: ClientesService,
              private preciosService: PreciosService,
              private inscripcionesService: InscripcionesService,
              private spinner: NgxSpinnerService,
              private notificationService: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.getPrecios();
  }

  agregarInscripciones(id: string) {
    /**
     * Obtener el cliente y ocultar el componente listado con clienteId
     * @param  {string} id  id del cliente
     */
    this.clientesService.get(id).subscribe(res => {
      this.clienteId = id;
      this.clienteNombre = `${res.nombre} ${res.apellido}`;
    })
  }

  getPrecios() {
    /**
     * Obtener los precios y guardar en array
     */
    this.preciosService.getAll().subscribe(res => {
      this.precios = res;
    })
  }

  seleccionarPrecio(id: string) {
    /**
     * Seleccionar el precio, mostrar en html y seleccionar la fecha segun el precio
     * @param  {string} id  id del precio
     */
    this.fechaInicial.setValue(new Date());
    this.precio = this.precios.find(x => x.id == id) as Precios;
    this.total = this.precio.costo;
    this.seleccionarFecha();
  }

  seleccionarFecha() {
    /**
     * Calcular la fecha segun el precio
     */
    let desplazamiento: number;
    let fechaInicial: Date = new Date(this.fechaInicial.value);
    let duracion: number = Number(this.precio.duracion);

    if (this.precio.tipoDuracion == 1) {
      desplazamiento = duracion;
      this.fechaFinal = this.agregarDias(fechaInicial, desplazamiento);
    } else if (this.precio.tipoDuracion == 2) {
      desplazamiento = duracion * 7;
      this.fechaFinal = this.agregarDias(fechaInicial, desplazamiento);
    } else if (this.precio.tipoDuracion == 3) {
      desplazamiento = fechaInicial.getMonth() + duracion;
      this.fechaFinal = new Date(fechaInicial.setMonth(desplazamiento));
    } else if (this.precio.tipoDuracion == 4) {
      desplazamiento = fechaInicial.getFullYear() + duracion;
      this.fechaFinal = new Date(fechaInicial.setFullYear(desplazamiento));
    }
  }

  agregarDias(date: Date, days: number): Date {
    /**
     * Sumar dias a una fecha
     * @param  {Date} date  fecha inicial
     * @param  {number} days  dias a sumar
     * @return {Date} fecha calculada
     */
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  guardarInscripcion() {
    /**
     * Guardar valores al objeto inscripcion
     */
    this.inscripcion = {
      fechaInicial: this.fechaInicial.value,
      fechaFinal: this.fechaFinal,
      cliente: this.clientesService.getRef(this.clienteId),
      precio: this.preciosService.getRef(this.precio.id),
      total: this.precio.costo
    }

  }

  onSubmit() {
    /**
     * Guardar la inscricion en firebase
     */
    if (this.precioId != undefined) {
      this.guardarInscripcion()
      this.spinner.show();
      this.inscripcionesService.create(this.inscripcion).then(() => {
        this.spinner.hide();
        this.notificationService.exitoToast('Inscripcion Registrada!');
      }).catch(reason => {
        this.spinner.hide();
        this.notificationService.errorToast('Se ha producido un error!');
        console.log(reason);
      })
    } else {
      console.log('precio undefined');
    }
  }

}
