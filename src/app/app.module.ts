import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularCesiumModule } from 'angular-cesium';
import { AngularCesiumWidgetsModule } from 'angular-cesium';
import { StoreModule } from '@ngrx/store';
import { LoginScreenModule } from './feature/login-screen/login-screen.module';
import { EffectsModule } from '@ngrx/effects';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginScreenModule,
    BrowserAnimationsModule,
    AngularCesiumModule.forRoot(),
    AngularCesiumWidgetsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [{provide:APOLLO_OPTIONS,useFactory: (httpLink:HttpLink) => {
    return {
      cache: new InMemoryCache(),
      link: httpLink.create({uri:environment.backendUrl})
    }
  },deps:[HttpLink]}],
  bootstrap: [AppComponent],
})
export class AppModule {}
