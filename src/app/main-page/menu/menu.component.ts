import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { menuLeftDessertData, menuLeftDrinksData, menuLeftLunchData, menuRightDessertData, menuRightDrinksData, menuRightLunchData } from '../data';
import { MainService } from '../main.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy{

  menuLeftLunchElements = menuLeftLunchData
  menuRightLunchElements = menuRightLunchData
  currentOption = 'lunch'
  animate = true;
  isTimeout;
  isViewed = false;
  sub: Subscription

  constructor( private mainService: MainService) {}

  ngOnInit() {
    this.sub = this.mainService.animateComponent.subscribe((component) =>{
      if (component === 'menu') {
        this.isViewed = true
      }
    })
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

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}