import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../main-page/main.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  lastScrollPosition = 0;
  isScrolledUp = true;
  isScrolledDown = false;
  arrowButtonTop = true;
  sub: Subscription
  currentButton = 'menu'

  constructor(private mainService: MainService) { }
  
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const currentScrollPosition = window.pageYOffset;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    
    this.isScrolledDown = scrollPosition > 0;
    if (scrollPosition > 150) {
      this.arrowButtonTop = false;
    } else {
      this.arrowButtonTop = true;
    }
    if (currentScrollPosition > this.lastScrollPosition) {
      this.isScrolledUp = false; // Scrolling down
    } else {
      this.isScrolledUp = true; // Scrolling up
    }

    this.lastScrollPosition = currentScrollPosition;
  }

  
  @ViewChild('drawer') drawer: MatDrawer | undefined;
  isSidenavOpen: boolean = false;

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.drawer.toggle()
    if (this.isSidenavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  ngOnInit() {
    this.sub = this.mainService.flagButton.subscribe((value) =>{
      this.currentButton = value
    })
  }

  toTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  toMenu() {
    this.mainService.navigateMenu.next()
  }

  toStory() {
    this.mainService.navigateStory.next()
  }

  toContact() {
    this.mainService.navigateContact.next()
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}

