import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { foodDesc, foodImg } from '../data';


@Component({
  selector: 'app-food-section',
  templateUrl: './food-section.component.html',
  styleUrls: ['./food-section.component.css']
})
export class FoodSectionComponent {
  // @ViewChild('foodC', { read: ElementRef }) foodC: ElementRef;
  images = foodImg;
  currentIndex = 0;
  foodImg = '../../../assets/food1.jpg'
  dataArray = foodDesc
  data = this.dataArray[this.currentIndex];
  isTimeout
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
  

  updateBackground() {
    this.foodImg = `../../assets/${this.images[this.currentIndex]}`;
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
    
  }
