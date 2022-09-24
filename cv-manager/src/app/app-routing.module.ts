import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateApplicationComponent } from './_components/create-application/create-application.component';
import { SearchComponent } from './_components/search/search.component';

const routes: Routes = [
  {path: 'create-application', component: CreateApplicationComponent},
  {path: '', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
