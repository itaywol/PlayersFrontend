import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { coreStoreToken, coreReducer } from './core.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(coreStoreToken,coreReducer)
  ]
})
export class CoreModule { }
