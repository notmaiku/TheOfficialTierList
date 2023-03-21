import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { TiersComponent } from './components/tiers/tiers.component';
import { TierItemComponent } from './components/tier-item/tier-item.component';
import { AddTierComponent } from './components/add-tier/add-tier.component';
import { AboutComponent } from './pages/about/about.component';
import { TierListComponent } from './pages/tier-list/tier-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

const appRoutes: Routes = [
  {path: '', component: TierListComponent},
  {path: 'about', component: AboutComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    TiersComponent,
    TierItemComponent,
    AddTierComponent,
    AboutComponent,
    TierListComponent,
 ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
