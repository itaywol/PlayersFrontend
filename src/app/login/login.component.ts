import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {map} from "rxjs/operators"
import { Store } from '@ngrx/store';
import { LoginAction } from '../player/player.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public nickName:string = "";
  public errorMessage:string = ""

  constructor(private httpClient:HttpClient,private store:Store<any>) { }

  ngOnInit(): void {
  }

  generateRandomName():void {
    this.httpClient.get(environment.randomUserApi).pipe(map((result:any)=> {
      if(!result.results[0]?.login?.username) throw new Error("Random name api unavailble")
      return result.results[0].login.username.substring(0,10)
    })).subscribe(x=>this.nickName=x,(error:Error)=>this.errorMessage=error.message.substring(6,error.message.length))
  }

  invokeLogin():void {
    if(this.nickName.length<=3 || this.nickName.length>=11) {
      this.errorMessage="Name invalid"
      return;
    }

    this.store.dispatch(new LoginAction(this.nickName))
  }

}
