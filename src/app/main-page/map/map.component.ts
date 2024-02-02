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

  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.sub = this.mainService.animateComponent.subscribe((component) =>{
      if (component === 'contact') {
        this.isViewed = true
      }
    })
    
  }
  ngAfterViewInit() {
    this.initMap()
  }
  
  @ViewChild('gmapContainer', { static: false }) gmap: ElementRef;

  initMap() {
    let map: google.maps.Map;
    let lat = 21.32878220283764;
    let lng = -157.9636736678035;
  
    let coordinates = new google.maps.LatLng(lat, lng);
  
    let mapOptions: google.maps.MapOptions = {
     center: coordinates,
     zoom: 13
    };
  
    let marker: google.maps.Marker;
    map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
    marker = new google.maps.Marker({
      position: coordinates,
      map: map,
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
