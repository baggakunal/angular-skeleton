import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlainGridComponent } from './components/plain-grid/plain-grid.component';

const routes: Routes = [
  {
    path: 'plain-grid',
    component: PlainGridComponent
  },
  {
    path: '',
    redirectTo: 'plain-grid',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'plain-grid',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
