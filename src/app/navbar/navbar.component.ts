import { AuthonService } from './../authon.service';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  showLinks: boolean = false

  constructor(private _AuthonService: AuthonService, private _Router: Router, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._AuthonService.isLogin.subscribe((value) => {
      this.showLinks = value
    })
  }
  logOut() {
    this._Router.navigate(['/login'])
    this.showLinks = false
    localStorage.removeItem('token')
  }

  toggleMenu() {
    const navToggle = this.el.nativeElement.querySelectorAll('.toggle');
    navToggle.forEach((element: any) => {
      if (element.classList.contains('hidden')) {
        this.renderer.removeClass(element, 'hidden');
      } else {
        this.renderer.addClass(element, 'hidden');
      }
    });
  }
}
