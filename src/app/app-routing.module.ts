import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesComponent } from './components/games/games.component';

const routes: Routes = [
  {
    path: 'games',
    component: GamesComponent
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
