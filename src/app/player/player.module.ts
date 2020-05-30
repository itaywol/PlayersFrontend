
import { PlayerComponent } from './container/player.component';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerEffects } from './effects/player.effects';
import { PlayerService } from './player.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';



@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatRippleModule,
    EffectsModule.forFeature([PlayerEffects])
  ],
  providers:[PlayerService],
  exports:[PlayerComponent]
})
export class PlayerModule { }
