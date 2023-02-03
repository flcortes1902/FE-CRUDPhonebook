import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Componentes
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { PhoneListComponent } from './components/phone-list/phone-list.component';
import { CheckRegisterComponent } from './components/check-register/check-register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modulos
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AddEditComponent,
    PhoneListComponent,
    CheckRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
