import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MainService } from './main.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('mainComponent', { read: ElementRef }) mainComponent: ElementRef;
  @ViewChild('storyComponent', { read: ElementRef }) storyComponent: ElementRef;
  @ViewChild('menuComponent', { read: ElementRef }) menuComponent: ElementRef;
  @ViewChild('contactComponent', { read: ElementRef }) contactComponent: ElementRef;
  images = ['main1.jpg', 'main2.jpg', 'main3.jpg', 'main4.jpg'];
  currentIndex = 0;
  bgImg = '../../assets/main1.jpg'
  sub1: Subscription
  sub2: Subscription
  sub3: Subscription
  sub4: Subscription

  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.sub2 = this.mainService.navigateStory.subscribe(() =>{
      this.scroll(this.storyComponent.nativeElement)
    })
    this.sub3 = this.mainService.navigateMenu.subscribe(() =>{
      this.scroll(this.menuComponent.nativeElement)
    })
    this.sub4 = this.mainService.navigateContact.subscribe(() =>{
      this.scroll(this.contactComponent.nativeElement)
    })
  }

  ngAfterViewInit(): void {
    this.observeElement(this.mainComponent.nativeElement, 'main');
    this.observeElement(this.storyComponent.nativeElement, 'story');
    this.observeElement(this.menuComponent.nativeElement, 'menu');
    this.observeElement(this.contactComponent.nativeElement, 'contact');
  }

  observeElement(element: HTMLElement, component: string) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            this.mainService.flagButton.next(component)
        }
      });
    }, options);

    observer.observe(element);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  updateBackground() {
    this.bgImg = `../../assets/${this.images[this.currentIndex]}`;
  }

  toMenu() {
    this.scroll(this.menuComponent.nativeElement)
  }

  onLeft() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateBackground();
  }

  onRight() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateBackground();
  }
  ngOnDestroy() {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
    this.sub3.unsubscribe()
    this.sub4.unsubscribe()
  }
}
