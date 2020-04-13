import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpRequest,HttpRequestDefaults } from './http-interfaces';






@Injectable({
  providedIn: 'root'
})
export class HttpService extends HttpClient {


  public defaults: HttpRequestDefaults = {
    method: "GET",
    auth: false,
    headers: {},
  };



  





  public httpHeaders = new HttpHeaders().set(
    'Content-Type',
    'text/plain'
  );

  public load(req: HttpRequest): Promise<any> {

    if (req.method == undefined) {
      req.method = this.defaults.method;
    }
    
    if (req.auth==undefined) {
      req.auth=this.defaults.auth;
    }
    
    if (req.headers==undefined) {
      req.headers=this.defaults.headers;
    }


    
    var url = req.url;

    //if params ha a value, dot it
    if (req.params != undefined) {
      url = req.url + "?" + Object.keys(req.url)[0] + "=" + Object.values(req.url)[0];
    }

    if (req.data != undefined && req.method=="POST") {
      return this.request(req.method, url, { body: req.data, withCredentials: true, headers: req.headers }).toPromise() as Promise<any>;
    }

    if(req.method=="GET" && req.params!=undefined && req.data!=undefined){

      //do it if data includes the same key-value pair as in the params
      if (req.data.toString().includes(req.params.toString())) {
        url=req.url;        
      } else {
        url = req.url + "?" + Object.keys(req.url)[0] + "=" + Object.values(req.url)[0];
      }

      return this.request(req.method,url,{ body: req.data, withCredentials: true, headers: req.headers }).toPromise() as Promise<any>;
    }

    

    return this.request(req.method, url,{ withCredentials: true }).toPromise() as Promise<any>;
  }



}
