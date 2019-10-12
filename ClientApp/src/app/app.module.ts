import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { InputTextComponent } from './component/input-text/input-text.component';
import { InputSelectComponent } from './component/input-select/input-select.component';
import { NewVendorComponent } from './view/new-vendor/new-vendor.component';
import { RadioSelectComponent } from './component/radio-select/radio-select.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InputTextComponent,
    InputSelectComponent,
    NewVendorComponent,
    RadioSelectComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'new-vendor', component: NewVendorComponent, pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
