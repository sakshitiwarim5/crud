import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CompanyService } from "../company.service";
import { Company } from "../models";

@Component({
  selector: "app-company-list",
  templateUrl: "./company-list.component.html",
  styleUrls: ["./company-list.component.css"],
})
export class CompanyListComponent {
  companies: Company[] = [];

  constructor(private svc: CompanyService, private router: Router) {
    this.companies = this.svc.list();
  }

  deleteCompany(c: Company) {
    const ok = confirm(`Delete "${c.companyName}"?`);
    if (ok) {
      this.svc.delete(c.id);
      this.companies = this.svc.list();
    }
  }
}
