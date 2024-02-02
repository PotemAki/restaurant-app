import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../main-page/main.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
  message = ''
  isTimeOut: any;
  emailForm: FormGroup
  isViewed = false
  sub: Subscription

  constructor( private mainService: MainService) {}

  ngOnInit() {
    this.emailForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    })
    this.sub = this.mainService.animateComponent.subscribe((component) =>{
      if (component === 'footer') {
        this.isViewed = true
      }
    })
  }
  
  sendEmail() {
    if (this.emailForm.valid) {
        this.message = `We've recieved your email!`
        clearTimeout(this.isTimeOut)
        this.isTimeOut = setTimeout(() => {
        this.message = '';
      }, 1000);
      
    }
  }

  toTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

 ngOnDestroy() {
   this.sub.unsubscribe()
 }
}
