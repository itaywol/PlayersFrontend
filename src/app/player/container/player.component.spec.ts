import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PlayerComponent } from './player.component';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  let store: Store<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerComponent ],
      imports: [
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        MatCardModule,
        MatDividerModule,
        MatRippleModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
