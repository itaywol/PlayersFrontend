import { MatDividerModule, MatDivider } from '@angular/material/divider';
import { LoginAction } from './../player/player.actions';
import { StoreModule, Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { MatFormFieldModule, MatFormFieldControl, MatLabel } from '@angular/material/form-field';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store:Store<any>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent,MatDivider ],
      imports: [HttpClientModule,BrowserAnimationsModule,FormsModule,StoreModule.forRoot({}),MatDividerModule]
    })
    .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    store = TestBed.get(Store);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch a login task on login button press and execute a login action", () => {
    spyOn(store,"dispatch");

    spyOn(component,"invokeLogin").and.callThrough();

    const playerNameInput:HTMLInputElement  = fixture.debugElement.query(By.css('input[id=nameInput]')).nativeElement;
    playerNameInput.value = "itaywol";
    playerNameInput.dispatchEvent(new Event("input"));

    const loginButton = fixture.debugElement.query(By.css('button[id=submit]'));
    loginButton.triggerEventHandler('click',{});

    fixture.detectChanges();

    expect(component.invokeLogin).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(new LoginAction("itaywol"));
  })
});
