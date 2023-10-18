import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginGuard } from './auth/login.guard';
import { DashboardGuard } from './auth/dashboard.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] }, // Usa el guard "LoginGuard"
  { path: 'dashboard', component: DashboardComponent, canActivate: [DashboardGuard] }, // Usa el guard "HomeGuard"
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
