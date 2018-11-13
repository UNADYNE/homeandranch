import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { ContactComponent } from "./components/contact/contact.component";
import { AboutComponent } from "./components/about/about.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FlashMessagesModule } from "angular2-flash-messages";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SearchComponent } from "./components/search/search.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { UserComponent } from "./components/user/user.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AgmCoreModule } from "@agm/core";
import { AuthService } from "./services/auth.service";
import { MapService } from "./services/map.service";
import { MailService } from "./services/mail.service";
import { SearchService } from "./services/search.service";
import { SocketService } from "./services/socket.service";
import { UsersService } from "./services/users.service";
import { MapComponent } from "./components/map/map.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "about", component: AboutComponent, pathMatch: "full" },
  { path: "contact", component: ContactComponent, pathMatch: "full" },
  { path: "map", component: MapComponent, pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent, pathMatch: "full" },
  { path: "profile", component: ProfileComponent, pathMatch: "full" },
  { path: "search", component: SearchComponent, pathMatch: "full" }
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
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    FontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBYGM1RhThp4Yclz0WIr00-gpi50MN6_Ls"
    })
  ],
  providers: [
    AuthService,
    MapService,
    MailService,
    SearchService,
    SocketService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
