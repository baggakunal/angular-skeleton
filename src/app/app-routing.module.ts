import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesListComponent } from './components/games-list/games-list.component';

const routes: Routes = [
  {
    path: 'games',
    component: GamesListComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'games'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
