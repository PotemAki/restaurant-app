import { Component, HostListener, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  title = 'angular-gmap';
  isViewed = true 

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
  

  @ViewChild('gmapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = 21.32878220283764;
  lng = -157.9636736678035;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
   center: this.coordinates,
   zoom: 13
  };

  marker: google.maps.Marker; // Declare marker without initialization

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
    });
  }
}
