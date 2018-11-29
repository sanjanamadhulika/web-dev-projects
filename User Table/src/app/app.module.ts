import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { UsersComponent } from "./users/users.component";
import { UsersService } from "./users/users.service";
import { HttpClientModule } from "@angular/common/http";
import { FiveDigitsZipcodePipe } from "./users/five-digits-zipcode.pipe";

@NgModule({
  declarations: [AppComponent, UsersComponent, FiveDigitsZipcodePipe],
  imports: [BrowserModule, HttpClientModule],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {}
