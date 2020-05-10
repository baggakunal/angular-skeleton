import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlainGridComponent } from './components/plain-grid/plain-grid.component';
import { PlainServerGridComponent } from './components/plain-server-grid/plain-server-grid.component';
import { GroupedServerGridComponent } from './components/grouped-server-grid/grouped-server-grid.component';

const routes: Routes = [
  {
    path: 'plain-grid',
    component: PlainGridComponent
  },
  {
    path: 'plain-server-grid',
    component: PlainServerGridComponent
  },
  {
    path: 'grouped-server-grid',
    component: GroupedServerGridComponent
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
