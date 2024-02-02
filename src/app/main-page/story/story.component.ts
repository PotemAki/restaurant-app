import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { storyData } from '../data';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MainService } from '../main.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit, OnDestroy{
  bgImg = 'assets/story1.jpg'
  data = storyData[0]
  isViewed = false;
  isFliped = false;
  sub: Subscription

  constructor( private mainService: MainService) {}

  ngOnInit() {
    this.sub = this.mainService.animateComponent.subscribe((component) =>{
      if (component === 'story') {
        this.isViewed = true
      }
    })
  }

  flipContainer() {
    this.isFliped = !this.isFliped
    if (this.isFliped) {
      this.bgImg = 'assets/story5.jpg'
    } else {
      this.bgImg = 'assets/story1.jpg'
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
