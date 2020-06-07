import { RouterTestingModule } from '@angular/router/testing';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { PlayerComponent } from './player.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Player } from '../interfaces/player.model';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  let store: Store<any>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerComponent],
      imports: [
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        MatCardModule,
        MatDividerModule,
        MatRippleModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have ready button', fakeAsync(() => {
    component.player = new Player('itaywol', 'istestingalot', false);
    component.currentPlayer = true;
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('.ready-button')
    ).nativeElement;
    tick();
    expect(button).toBeTruthy();
  }));
});
