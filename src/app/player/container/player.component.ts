import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../interfaces/player.model';
import { Store } from '@ngrx/store';
import { HitReady } from '../player.actions';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() player:Player;
  @Input() currentPlayer:boolean;

  constructor(private store:Store<any>) { }

  ngOnInit(): void {
    console.log(this.player)
  }

  becomeReady() {
    this.store.dispatch(new HitReady(this.player))
  }

}
