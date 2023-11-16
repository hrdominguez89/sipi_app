import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { DashboardAdminComponent } from './components/pages/dashboard-admin/dashboard-admin.component';
import { TableComponent } from './components/pages/datatable/table.component';
import { DashboardProfComponent } from './components/pages/dashboard-prof/dashboard-prof.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard-admin', component: DashboardAdminComponent },
  { path: 'dashboard-prof', component: DashboardProfComponent },
  { path: 'dashboard-bedel', component: DashboardProfComponent }, // modificar component
  { path: 'dashboard-default', component: DashboardProfComponent }, // modificar component
  { path: 'table/:tableName', component: TableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
