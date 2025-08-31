import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { CompanyListComponent } from "./company-list/company-list.component";
import { CompanyFormComponent } from "./company-form/company-form.component";
import { CompanyService } from "./company.service";

@NgModule({
  declarations: [AppComponent, CompanyListComponent, CompanyFormComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "companies", pathMatch: "full" },
      { path: "companies", component: CompanyListComponent },
      { path: "new-company", component: CompanyFormComponent },
      { path: "edit-company/:id", component: CompanyFormComponent },
      { path: "**", redirectTo: "companies" },
    ]),
  ],
  providers: [CompanyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
