import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BootstrapGridComponent } from './components/bootstrap-grid/bootstrap-grid.component';

const routes: Routes = [
  {
    path: 'bootstrap-grid',
    component: BootstrapGridComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'bootstrap-grid'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
