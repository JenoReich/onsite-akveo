/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'style-loader!leaflet/dist/leaflet.css';

@Component({
  selector: 'ngx-leaflet',
  styleUrls: ['./leaflet.component.scss'],
  templateUrl:'./leaflet.component.html',
})
export class LeafletComponent implements OnInit, AfterViewInit {

  public itinerary: any;
  public itineraryParent: any;

  constructor() { }

  ngOnInit() {

    /*
    //create a map
    var map = L.map('map', {
      center: [48.3298210, 19.6637810],
      zoom: 8,

    });

    //add different layers to the same map
    map.addLayer(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© OpenStreetMap contributors' }));
    //map.addLayer(L.marker({ lat: 48.3298210, lng: 19.6637810 }, { clickable: true, title: "title", interactive: true, riseOnHover: true }));
    //map.addLayer(L.marker({ lat: 48.2873401, lng: 17.7416324 }, { clickable: true, title: "title2" }));
    //map.addLayer(L.polygon([{ lat: 48.3298210, lng: 19.6637810 }, { lat: 48.2873401, lng: 17.7416324 }], { smoothFactor: 1.0 }));

    /*
    //apply leaflet routing machine on the map
    L.Routing.control({
      //add coordinates
      waypoints: [
        L.latLng(57.74, 11.94),
        L.latLng(57.6792, 11.949),
        L.latLng(57.63, 11.89),
        L.latLng(57.78, 11.94),
        L.latLng(57.6792, 11.7),
        L.latLng(57.67, 11.89),
        L.latLng(57.9, 11.94),
        L.latLng(57.6792, 11.2),
        L.latLng(57.69, 11.34),
      ],

      //add api: osrm calculates the route and gives it back to leaflet routing machine
      router: L.Routing.osrmv1({
        serviceUrl: 'http://router.project-osrm.org/route/v1'
      })
      ,
      routeWhileDragging: false,
      show: false, //does not work

    }).addTo(map);
    */
    //L.Routing.itinerary({show:false}).addTo(map); //does not work
    //remove itinerary from DOM
    /*
    window.onloadstart== (event => {
      console.log("window has been loaded");
      this.itinerary = document.getElementsByClassName("leaflet-control-container")[0] as HTMLElement;
      this.itinerary.remove();
      //document.getElementById("map").style.setProperty("display","table");
    })

    //remove itinerary from DOM
    window.onload = (event => {
      console.log("window has been loaded");
      this.itinerary = document.getElementsByClassName("leaflet-control-container")[0] as HTMLElement;
      this.itinerary.remove();
      document.getElementById("map").style.setProperty("visibility","visible");
    })
    

  }

  */
}
  ngAfterViewInit() {


    

  }

  options = {
    layers: [
      //L.popup({closeButton:true}),
      //L.polyline([{ lat: 48.3298210, lng: 19.6637810 },{ lat: 48.2873401, lng: 17.7416324 }],{smoothFactor:1.0}),
      L.polygon([{ lat: 48.3298210, lng: 19.6637810 }, { lat: 48.2873401, lng: 17.7416324 }], { smoothFactor: 1.0 }),
      L.marker({ lat: 48.3298210, lng: 19.6637810 }, { clickable: true, title: "title", interactive: true, riseOnHover: true }),
      L.marker({ lat: 48.2873401, lng: 17.7416324 }, { clickable: true, title: "title2" }),
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),


    ],
    zoom: 8,
    center: L.latLng({ lat: 48.3298210, lng: 19.6637810 }),




  };


}
