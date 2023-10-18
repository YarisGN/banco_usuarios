import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { registrarUsuarios } from 'src/app/interface/users';
import { Usuarios } from 'src/app/interface/users';
import { UsersService } from 'src/app/services/usuarios.service';
import { AddEditUserComponent } from '../agregarEditarUsuarios/agregarEditarUsuarios.component';
import { DeleteUserComponent } from '../eliminarUsuario/eliminarusuario.component'; 
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'Nombre', 'Edad', 'Profesion', 'Accion'];
  dataSource = new MatTableDataSource<Usuarios>();


  constructor(
    private _usersService: UsersService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.mostrarUsuarios();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  registrarUsuario() {
    this.dialog.open(AddEditUserComponent, {
      disableClose: true,
      width: "300px"
    }).afterClosed().subscribe(result => {
      if (result === "Creado") {
        this.mostrarUsuarios();
      }
    });
  }
  showAlert(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition:"end",
      verticalPosition: "top",
      duration: 3000
    });
  }


  eliminarUsuario(dataUser:registrarUsuarios){
    this.dialog.open(DeleteUserComponent,{
      disableClose: true,
      data:dataUser
    }).afterClosed().subscribe(result => {
      if (result === "Eliminado") {
        this._usersService.eliminarUsuario(dataUser.id).subscribe({
          next:(data)=> {
            this.showAlert("Usuario eliminado exitosamente", "exito");
            this.mostrarUsuarios();
          },error:(e)=>{console.log(e)}
        
        });
      }
    });
  }

  editarUsuario(dataUser:registrarUsuarios) {
    this.dialog.open(AddEditUserComponent,{
      disableClose: true,
      width: "300px",
      data:dataUser
    }).afterClosed().subscribe(result => {
      if (result === "Actualizado") {
        this.mostrarUsuarios();
      }
    });
  }

  mostrarUsuarios() {
    this._usersService.obtenerUsuarios().subscribe({
      next: (data: any) => {
        console.log(data.body);
        this.dataSource = new MatTableDataSource(data.body)
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator.pageSize = 5;
      }, error: (e) => { }
    });
  }
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
}



