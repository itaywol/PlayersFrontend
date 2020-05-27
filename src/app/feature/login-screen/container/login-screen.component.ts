import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ExecuteLogin } from '../login-screen.actions';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
})
export class LoginScreenComponent implements OnInit {

  @Input()
  public loginInput: string

  /**
   *
   */
  constructor(private store:Store<any>) {}

  ngOnInit(): void {}

  clickLogin() {
    if(this.loginInput.length<4 || this.loginInput.length>10) return;
    this.store.dispatch(new ExecuteLogin(this.loginInput))
  }
}
