import { Component, ElementRef, HostListener } from '@angular/core';
import { menuLeftDessertData, menuLeftDrinksData, menuLeftLunchData, menuRightDessertData, menuRightDrinksData, menuRightLunchData } from '../data';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  menuLeftLunchElements = menuLeftLunchData
  menuRightLunchElements = menuRightLunchData
  currentOption = 'lunch'
  animate = true;
  isTimeout;
  isViewed = false;

  constructor(private elementRef: ElementRef) {}
  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    const isInViewport = this.isElementInViewport();
    if (isInViewport) {
      this.isViewed = true
    } else {
  
      this.isViewed = false;
    }
  }

  private isElementInViewport() {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();

    return (
      rect.top + 50 <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom + 0 >= 0 &&
      rect.left >= 0 &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }


  toLunch() {
    this.menuLeftLunchElements = menuLeftLunchData
    this.menuRightLunchElements = menuRightLunchData
    this.currentOption = 'lunch'
    this.setAnimation()
  }

  toDessert() {
    this.menuLeftLunchElements = menuLeftDessertData
    this.menuRightLunchElements = menuRightDessertData
    this.currentOption = 'dessert'
    this.setAnimation()
  }

  toDrinks() {
    this.menuLeftLunchElements = menuLeftDrinksData
    this.menuRightLunchElements = menuRightDrinksData
    this.currentOption = 'drinks'
    this.setAnimation()
  }


setAnimation() {
  this.animate = false
    if (this.isTimeout) {
      clearTimeout(this.isTimeout)
    }
    this.isTimeout = setTimeout(() => {
      this.animate = true
    },100)
}

}