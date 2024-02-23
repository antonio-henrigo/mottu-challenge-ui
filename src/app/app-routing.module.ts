import { FavoriteComponent } from './layout/favorite/favorite.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './layout/content/content.component';

const routes: Routes = [
  { path: 'inicio', component: ContentComponent },
  { path: 'favoritos', component: FavoriteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
