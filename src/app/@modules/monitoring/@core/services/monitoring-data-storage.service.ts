import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitoringDataStorageService {

  /**stores the selected locationID,
   * retrieved from route
   */
  public selectedLocationID: string;
  
  /**stores the devicePosition data being in
   * connection with the selected location ID
    */
  public deviceData:any;

  /**stores the whole data associated
   *  with the selected location ID
    */
   public locationData:any;

   /**observes the call of the update() method
    * and triggers event subscribed to this observable
   */
   public dataHasArrived:BehaviorSubject<any>=new BehaviorSubject({});

  constructor() { }

  /**triggers event subscribed to the
   * dataHasArrived behaviorsubject
   */
  public update(){
    this.dataHasArrived.next("");
  }


}
