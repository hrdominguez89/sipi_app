import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { DashboardAdminComponent } from './components/pages/dashboard-admin/dashboard-admin.component';
import { TableComponent } from './components/pages/datatable/table.component';
import { DashboardProfComponent } from './components/pages/dashboard-prof/dashboard-prof.component';
import { CalendarComponent } from './components/pages/calendar/calendar.component';
import { AuthGuard } from './auth.guard';
import { DefaultComponent } from './components/pages/default/default.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard-admin', component: DashboardAdminComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-prof', component: DashboardProfComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-bedel', component: DefaultComponent, canActivate: [AuthGuard] }, // modificar component
  { path: 'default', component: DefaultComponent, canActivate: [AuthGuard] },
  { path: 'table/:tableName', component: TableComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
