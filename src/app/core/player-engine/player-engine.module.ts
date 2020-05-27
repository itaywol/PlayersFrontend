import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {
  corePlayerEngineToken,
  PlayerCoreReducer,
} from './reducers/player-engine.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(corePlayerEngineToken, PlayerCoreReducer),
  ],
})
export class PlayerEngineModule {}
