import { Component, OnDestroy, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {} from 'googlemaps';
import { Subscription } from 'rxjs';
import { MainService } from '../main.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit, OnDestroy {
  title = 'angular-gmap';
  isViewed = false 
  sub: Subscription

  constructor(private mainService: MainService, private elementRef: ElementRef) {}

  ngOnInit() {
    this.sub = this.mainService.animateComponent.subscribe((component) =>{
      if (component === 'contact') {
        this.isViewed = true
      }
    })
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

  marker: google.maps.Marker;

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

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
