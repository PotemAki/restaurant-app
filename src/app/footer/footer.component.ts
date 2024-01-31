import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  message = ''
  isTimeOut: any;
  emailForm: FormGroup
  isViewed = false

  ngOnInit() {
    this.emailForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    })
  }

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

 
}
