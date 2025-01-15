import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/features/models/user-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user?: User
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.user().subscribe({
      next: res => this.user = res,
      error: err => console.log(err)

    })

    this.user = this.authService.getuserFromLocalStorage();
  }
  onLogout() {
    this.authService.logout();
  }
}
