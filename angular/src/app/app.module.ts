import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatDialogConfig, MatDialogModule, MatGridListModule} from '@angular/material';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {ContactComponent} from './components/contact/contact.component';
import {AboutComponent} from './components/about/about.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SearchComponent} from './components/search/search.component';
import {ProfileComponent} from './components/profile/profile.component';
import {UserComponent} from './components/user/user.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AgmCoreModule, AgmMarker, MarkerManager, GoogleMapsAPIWrapper} from '@agm/core';
import {AuthService} from './services/auth.service';
import {MapService} from './services/map.service';
import {MailService} from './services/mail.service';
import {SearchService} from './services/search.service';
import {SocketService} from './services/socket.service';
import {MapComponent} from './components/map/map.component';
import {SanitizeService} from './services/sanitize.service';
import {PropertyComponent} from './components/property/property.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OverlayModule} from '@angular/cdk/overlay';
import {ListnoDirective} from './directives/listno.directive';
import {PropertySliderComponent} from './components/property-slider/property-slider.component';
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {UserService} from "./services/user.service";
import {ValidateService} from "./services/validate.service";
import {JwtHelper} from "angular2-jwt";
import {AuthGuard} from "./guards/auth.guard";

const appRoutes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'about', component: AboutComponent, pathMatch: 'full'},
  {path: 'contact', component: ContactComponent, pathMatch: 'full'},
  {path: 'map', component: MapComponent, pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, pathMatch: 'full'},
  {path: 'search', component: SearchComponent, pathMatch: 'full'},
  {path: 'slider', component: PropertySliderComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    NavbarComponent,
    SearchComponent,
    ProfileComponent,
    UserComponent,
    DashboardComponent,
    MapComponent,
    PropertyComponent,
    ListnoDirective,
    PropertySliderComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    FontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYGM1RhThp4Yclz0WIr00-gpi50MN6_Ls'
    }),
    MatDialogModule,
    OverlayModule,
    MatGridListModule
  ],
  entryComponents: [
    PropertyComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    MapService,
    MailService,
    SanitizeService,
    SearchService,
    SocketService,
    GoogleMapsAPIWrapper,
    AgmMarker,
    MarkerManager,
    MatDialogConfig,
    UserService,
    ValidateService,
    JwtHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
