import { Component, ElementRef, HostListener } from '@angular/core';
import { storyData } from '../data';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent {
  // @ViewChild('storyC', { read: ElementRef }) storyC: ElementRef;
  bgImg = 'assets/story1.jpg'
  data = storyData[0]
  isViewed = false;
  isFliped = false;

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

  flipContainer() {
    this.isFliped = !this.isFliped
    if (this.isFliped) {
      this.bgImg = 'assets/story5.jpg'
    } else {
      this.bgImg = 'assets/story1.jpg'
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
}
