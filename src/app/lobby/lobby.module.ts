import { PlayerModule } from './../player/player.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './container/lobby.component';
import { EffectsModule } from '@ngrx/effects';
import { LobbyScreenEffects } from './effects/lobby.effects';
import { LobbyService } from './lobby.service';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [LobbyComponent],
  imports: [
    CommonModule,
    PlayerModule,
    EffectsModule.forFeature([LobbyScreenEffects])
  ],
  providers: [LobbyService]
})
export class LobbyModule { }
