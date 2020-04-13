import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core'
import { marker } from './marker.image'
import { proj, View } from 'openlayers'
import { HttpClient } from '@angular/common/http'
import { Subscription } from 'rxjs'
import { GeoLocationService } from './geo-location.service'
import { CentralDataStorageService } from '@app/@core/services/central-data-storage.service'

@Component({ 
  selector: 'vo-ui-osm-view',
  templateUrl: './osm-view.component.html',
  styleUrls: ['./osm-view.component.css'],
  providers: [HttpClient, GeoLocationService]
})
export class OsmViewComponent implements OnInit, OnDestroy {
  @Input()
  geoReverseService = 'https://nominatim.openstreetmap.org/reverse?key=iTzWSiYpGxDvhATNtSrqx5gDcnMOkntL&format=json&addressdetails=1&lat={lat}&lon={lon}'

  @Input()
  width: string
  @Input()
  height: string

  @Input()
  //latitude = 47.501310
  latitude = 48.3298210
  @Input()
  //longitude = 18.983800
  longitude = 19.6637810

  @Input()
  //latitudePointer = 47.501310
  latitudePointer = 48.3298210
  @Input()
  //longitudePointer = 18.983800
  longitudePointer = 19.6637810

  @Input()
  showControlsZoom: boolean
  @Input()
  titleZoomIn = 'Zoom in'
  @Input()
  titleZoomOut = 'Zoom out'
  @Input()
  showControlsCurrentLocation: boolean
  @Input()
  titleCurrentLocation = 'Current location'

  @Input()
  showDebugInfo: boolean=false;
  @Input()
  opacity = 1

  //set zoom
  @Input()
  zoom = 8.5

  markerImage = marker

  reverseGeoSub: Subscription = null
  pointedAddress: string
  pointedAddressOrg: string
  position: any
  dirtyPosition;

  public latitude2:number;
  public latitudePointer2:number;
  public longitude2:number;
  public longitudePointer2:number;

  @Output()
  addressChanged = new EventEmitter<String>()

  constructor(private httpClient: HttpClient, private geoLocationService: GeoLocationService, private centralStorage:CentralDataStorageService) {
    console.log(this.centralStorage.currentRoute);
  }

  ngOnInit() {
    this.drawMapRegardingDataStorage();
    
    /*

    if (this.showControlsCurrentLocation) {
      this.geoLocationService.getLocation().subscribe((position) => {
        this.position = position
        if (!this.dirtyPosition) {
          this.dirtyPosition = true
          this.longitude = this.longitudePointer = this.position.coords.longitude
          this.latitude = this.latitudePointer = this.position.coords.latitude
        }
      })
    }
    */
  }

  ngOnDestroy() {
    if (this.reverseGeoSub) {
      this.reverseGeoSub.unsubscribe()
    }
  }
  onSingleClick(event) {
    const lonlat = proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326')
    this.longitudePointer = lonlat[0]
    this.latitudePointer = lonlat[1]
    this.reverseGeo()
  }
  increaseOpacity() {
    this.opacity += 0.1
  }

  decreaseOpacity() {
    this.opacity -= 0.1
  }
  increaseZoom() {
    this.zoom++
  }
  decreaseZoom() {
    this.zoom--
  }

  setCurrentLocation(event) {
    // TODO FIX: setting current location does move the pointer but not the map!!!
    if (this.position) {
      this.longitude = this.longitudePointer = this.position.coords.longitude
      this.latitude = this.latitudePointer = this.position.coords.latitude
      /**
       * Trigger new address change
       */
      this.reverseGeo()
    }
  }

  reverseGeo() {
    const service = (this.geoReverseService || '')
      .replace(new RegExp('{lon}', 'ig'), `${this.longitudePointer}`)
      .replace(new RegExp('{lat}', 'ig'), `${this.latitudePointer}`)
    this.reverseGeoSub = this.httpClient.get(service).subscribe(data => {
      const val = (data || {})

      this.pointedAddressOrg = val['display_name']
      const address = []

      const building = []
      if (val['address']['building']) {
        building.push(val['address']['building'])
      }
      if (val['address']['mall']) {
        building.push(val['address']['mall'])
      }
      if (val['address']['theatre']) {
        building.push(val['address']['theatre'])
      }

      const zip_city = []
      if (val['address']['postcode']) {
        zip_city.push(val['address']['postcode'])
      }
      if (val['address']['city']) {
        zip_city.push(val['address']['city'])
      }
      const street_number = []
      if (val['address']['street']) {
        street_number.push(val['address']['street'])
      }
      if (val['address']['road']) {
        street_number.push(val['address']['road'])
      }
      if (val['address']['footway']) {
        street_number.push(val['address']['footway'])
      }
      if (val['address']['pedestrian']) {
        street_number.push(val['address']['pedestrian'])
      }
      if (val['address']['house_number']) {
        street_number.push(val['address']['house_number'])
      }

      if (building.length) {
        address.push(building.join(' '))
      }
      if (zip_city.length) {
        address.push(zip_city.join(' '))
      }
      if (street_number.length) {
        address.push(street_number.join(' '))
      }

      this.pointedAddress = address.join(', ')

      this.addressChanged.emit(this.pointedAddress)
    })
  }

  /**
   * sets the position regarding the central data storage &
   * draws it
   */
  public drawMapRegardingDataStorage():void{
    this.longitudePointer2=this.longitude2=parseFloat(this.centralStorage.currentRoute[1]["location_gps_lng"].toString());
    console.log("display longitudepointer",this.longitudePointer);
    this.latitudePointer2=this.latitude2=parseFloat(this.centralStorage.currentRoute[1]["location_gps_lat"].toString());
    console.log("display latitudepointer",this.latitudePointer);
  }
}