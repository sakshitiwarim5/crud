import { Injectable } from "@angular/core";
import { Company } from "./models";

const STORAGE_KEY = "companies_v1";

@Injectable({ providedIn: "root" })
export class CompanyService {
  private companies: Company[] = [];

  constructor() {
    const raw = localStorage.getItem(STORAGE_KEY);
    this.companies = raw ? JSON.parse(raw) : [];
  }

  private persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.companies));
  }

  list(): Company[] {
    return [...this.companies].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt)
    );
  }

  get(id: string): Company | undefined {
    return this.companies.find((c) => c.id === id);
  }

  create(company: Company) {
    this.companies.push(company);
    this.persist();
  }

  update(id: string, patch: Partial<Company>) {
    const idx = this.companies.findIndex((c) => c.id === id);
    if (idx >= 0) {
      this.companies[idx] = { ...this.companies[idx], ...patch };
      this.persist();
    }
  }

  delete(id: string) {
    this.companies = this.companies.filter((c) => c.id !== id);
    this.persist();
  }
}
