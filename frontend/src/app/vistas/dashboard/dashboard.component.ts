import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';

import { ListaI } from '../../modelos/lista.interface'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  clientes:ListaI[ ] = [ ]

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.api.getAllClients().subscribe(data =>{
      console.log(data)
    })
  }


  editar(id){
    this.router.navigate(['editar', id]);
  }

  nuevo(){
    this.router.navigate([nuevo]);
  }
}
