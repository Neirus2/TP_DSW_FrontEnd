import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-var',
  templateUrl: './nav-var.component.html',
  styleUrls: ['./nav-var.component.css']
})
export class NavVarComponent {

  constructor(
    public authService: AuthService,
  ) {}
}
