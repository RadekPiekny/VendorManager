import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { InputTextComponent } from './component/input-text/input-text.component';
import { InputSelectComponent } from './component/input-select/input-select.component';
import { NewVendorComponent } from './view/new-vendor/new-vendor.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InputTextComponent,
    InputSelectComponent,
    NewVendorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'new-vendor', component: NewVendorComponent, pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
