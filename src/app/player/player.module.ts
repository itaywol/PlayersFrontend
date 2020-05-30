import { PlayerComponent } from './container/player.component';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerEffects } from './effects/player.effects';
import { PlayerService } from './player.service';



@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([PlayerEffects])
  ],
  providers:[PlayerService]
})
export class PlayerModule { }
