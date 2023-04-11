import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { TierListComponent } from './components/tier-list/tier-list.component';
import { TiersComponent } from './components/tiers/tiers.component';
import { TierItemComponent } from './components/tier-item/tier-item.component';
import { AddTierComponent } from './components/add-tier/add-tier.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import {MatButtonModule} from '@angular/material/button';
import { AuthModule } from '@auth0/auth0-angular';
import { env } from 'env/enviroment';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserComponent } from './pages/user/user.component';
import { ListComponent } from './pages/list/list.component';
import { NewComponent } from './pages/new/new.component';
import { LoginHeroComponent } from './components/login-hero/login-hero.component';
import { CardComponent } from './components/card/card.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'user/:user_name', component: UserComponent},
  {path: 'tierlist/:list_id', component: ListComponent},
  {path: 'new', component: NewComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    TierListComponent,
    TiersComponent,
    TierItemComponent,
    AddTierComponent,
    AboutComponent,
    HomeComponent,
    SubmitButtonComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    FooterComponent,
    UserComponent,
    ListComponent,
    NewComponent,
    LoginHeroComponent,
    CardComponent
 ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    MatButtonModule,
    AuthModule.forRoot({
      domain: env.domain,
      clientId: env.clientID,
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
  }
}
