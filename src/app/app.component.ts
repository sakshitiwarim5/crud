import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  styleUrls: ["./app.component.css"],
  template: `
    <div class="container app-shell">
      <!-- Sidebar -->
      <aside class="sidebar card">
        <h3>Company CRUD</h3>
        <nav>
          <a routerLink="/companies" routerLinkActive="active">
            <span class="material-icons">business</span>
            Company List
          </a>
          <a routerLink="/new-company" routerLinkActive="active">
            <span class="material-icons">add_circle_outline</span>
            New Company
          </a>
        </nav>
        <div class="small note">
          <span class="material-icons" style="font-size:14px;">storage</span>
          LocalStorage persistence
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main">
        <div class="header">
          <h2>
            <span class="material-icons">apartment</span>
            Company CRUD
          </h2>
          <a class="btn primary" routerLink="/new-company">
            <span class="material-icons">add</span>
            New Company
          </a>
        </div>

        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppComponent {}
