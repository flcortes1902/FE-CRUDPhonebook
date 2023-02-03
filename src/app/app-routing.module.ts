import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Componentes
import { PhoneListComponent } from './components/phone-list/phone-list.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { CheckRegisterComponent } from './components/check-register/check-register.component';

const routes: Routes = [
  { path: '', redirectTo: 'phones', pathMatch: 'full'},
  { path: 'phones', component: PhoneListComponent },
  { path: 'phones/add', component: AddEditComponent },
  { path: 'phones/edit/:id', component: AddEditComponent },
  { path: 'phones/check/:id', component: CheckRegisterComponent },
  { path: '**', redirectTo: 'phones', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
