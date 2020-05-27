import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LoginScreenComponent } from './container/login-screen.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginScreenEffects } from './effects/login-screen.effects';

export const routes: Routes = [
  { path: 'login', component: LoginScreenComponent },
];

@NgModule({
  declarations: [LoginScreenComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([LoginScreenEffects]),
  ],
  exports: [LoginScreenComponent],
})
export class LoginScreenModule {}
