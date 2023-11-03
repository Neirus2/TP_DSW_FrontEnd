import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.css']
})
export class BottomNavbarComponent {
  shouldDisplay: boolean = false;

  shouldDisplayNavbar(): boolean {
    return this.shouldDisplay;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    
    if (window.scrollY + windowHeight >= docHeight) {
      this.shouldDisplay = true;
    } else {
      this.shouldDisplay = false;
    }
  }
}

