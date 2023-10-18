import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { registrarUsuarios } from 'src/app/interface/users';

@Component({
  selector: 'app-eliminarUsuario-user',
  templateUrl: './eliminarusuario.component.html',
  styleUrls: ['./eliminarusuario.component.css']
})
export class DeleteUserComponent implements OnInit{
  constructor(
    private dialogReference: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser: registrarUsuarios
  ){}
  ngOnInit(): void {}
  delete(){
    if(this.dataUser){
      this.dialogReference.close("Eliminado")
    }
  }
}
