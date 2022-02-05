import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-precios-dashboard',
  templateUrl: './precios-dashboard.component.html',
  styleUrls: ['./precios-dashboard.component.css']
})
export class PreciosDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  mostrarModal(id:string){
    console.log(id)
  }
}
