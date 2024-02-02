import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class MainService {
  navigateMenu = new Subject<void>()
  navigateStory = new Subject<void>()
  navigateContact = new Subject<void>()
  flagButton = new BehaviorSubject<string>('main')
  animateComponent = new BehaviorSubject<string>('main')
}