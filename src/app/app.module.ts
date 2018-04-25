import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomValidatorsService} from './shared/custom-validators.service';
import { InputStarsComponent } from './input-stars/input-stars.component';


@NgModule({
  declarations: [
    AppComponent,
    InputStarsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [CustomValidatorsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
