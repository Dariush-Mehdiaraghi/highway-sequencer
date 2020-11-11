import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./views/home/home.component";
import {DetailComponent} from "./views/detail/detail.component";
import {PageNotFoundComponent} from "./views/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'stream/:streamId', component: DetailComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
