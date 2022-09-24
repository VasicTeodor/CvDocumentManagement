import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationCardComponent } from './_components/application-card/application-card.component';
import { CreateApplicationComponent } from './_components/create-application/create-application.component';
import { SearchComponent } from './_components/search/search.component';
import { CvManagerService } from './_services/cv-manager/cv-manager.service';
import { SearchService } from './_services/search/search.service';
import { ValidationService } from './_services/validation/validation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CreateApplicationComponent,
    SearchComponent,
    ApplicationCardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    ToastrService,
    CvManagerService,
    ValidationService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
