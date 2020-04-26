import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsListComponent } from './components/items-list/items-list.component';

const routes: Routes = [
  {
    path: 'items-list',
    component: ItemsListComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'items-list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
