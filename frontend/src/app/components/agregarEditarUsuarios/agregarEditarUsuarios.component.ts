import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { registrarUsuarios } from 'src/app/interface/users';
import { UsersService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'agregarEditarUsuarios',
  templateUrl: './agregarEditarUsuarios.component.html',
  styleUrls: ['./agregarEditarUsuarios.component.css']
})
export class AddEditUserComponent implements OnInit {
  formUser: FormGroup;
  tituloAccion: string = "Registrar usuario"
  tituloBoton: string = "Registrar"
  usersList: registrarUsuarios[] = [];


  constructor(
    private dialogReference: MatDialogRef<AddEditUserComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public dataUser: registrarUsuarios

  ) {
    this.formUser = this.fb.group({
      id: [''],
      nombre: ['',Validators.required],
      edad: ['',Validators.required],
      profesion: ['',Validators.required],
    })

    this._usersService.obtenerUsuarios().subscribe({
      next:(data)=>{
        this.usersList = data;
      },error:(e)=>{}
    })
  }

  showAlert(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition:"end",
      verticalPosition: "top",
      duration: 3000
    });
  }
  addEditUser(){
   
    if(this.dataUser == null){
      const model: registrarUsuarios = {
        id: 0,
        nombre: this.formUser.value.nombre,
        edad: this.formUser.value.edad,
        profesion: this.formUser.value.profesion
      }
      this._usersService.agregarUsusario(model).subscribe({
        next:(data) => {
          this.showAlert("Usuario creado exitosamente", "exito");
          this.dialogReference.close("Creado");
        },error:(e) => {
          this.showAlert("El usuario no se pudo crear","Error")
        },
      })
    }else{
      const model: registrarUsuarios = {
        id: this.formUser.value.id,
        nombre: this.formUser.value.nombre,
        edad: this.formUser.value.edad,
        profesion: this.formUser.value.profesion
      }
      this._usersService.actualizarUsusario(this.dataUser.id, model).subscribe({
        next:(data) => {
          this.showAlert("Usuario actualizado exitosamente", "Exito");
          this.dialogReference.close("Actualizado");
        },error:(e) => {
          this.showAlert("No se ha podido actualizar","Error")
          
        },
      })
    }

  }

  ngOnInit(): void {
    if(this.dataUser){
      this.formUser.patchValue({
        id: this.dataUser.id,
        nombre: this.dataUser.nombre,
        edad: this.dataUser.edad,
        profesion: this.dataUser.profesion
      });
      this.tituloAccion = "Actualizar usuario";
      this.tituloBoton = "Actualizar";
    }
  }
}