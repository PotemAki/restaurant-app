import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { foodDesc, foodImg } from '../data';
import { MainService } from '../main.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-food-section',
  templateUrl: './food-section.component.html',
  styleUrls: ['./food-section.component.css']
})
export class FoodSectionComponent implements OnInit, OnDestroy {

  images = foodImg;
  currentIndex = 0;
  foodImg = 'assets/food1.jpg'
  dataArray = foodDesc
  data = this.dataArray[this.currentIndex];
  isTimeout
  isViewed = false;
  sub: Subscription

  constructor(private mainService: MainService) {}
  
  ngOnInit() {
    this.sub = this.mainService.animateComponent.subscribe((component) =>{
      if (component === 'food') {
        this.isViewed = true
      }
    })
  }
 
  

  updateBackground() {
    this.foodImg = `assets/${this.images[this.currentIndex]}`;
  }

  updateData() {
    this.data = this.dataArray[this.currentIndex];
  }

  onLeft() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateBackground();
    this.updateData();
    this.isViewed = false
    if (this.isTimeout) {
      clearTimeout(this.isTimeout)
    }
    this.isTimeout = setTimeout(() => {
      this.isViewed = true
    },100)
  }

  onRight() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateBackground();
    this.updateData();
    this.isViewed = false
    if (this.isTimeout) {
      clearTimeout(this.isTimeout)
    }
    this.isTimeout = setTimeout(() => {
      this.isViewed = true
    },100)
  }
    
  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
