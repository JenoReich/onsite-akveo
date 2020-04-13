import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpRequest, HttpRequestDefaults } from './http-interfaces';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService extends HttpClient {
  public defaults: HttpRequestDefaults = {
    method: 'GET',
    withCredentials: false,
    headers: {
      'Content-Type': 'text/plain'
    },
    enableCache: false
  };

  public requestCache: any = {};

  public load(request: HttpRequest): Promise<any> {
    /** merge request data with defaults */
    request = Object.assign({}, this.defaults, request);

    /** if enable cache this request and url */
    if (request.enableCache) {
      /** if data is already cached
       *  return as promise 
       * */
      if (this.requestCache[request.url] && this.requestCache[request.url].data) {
        return of(this.requestCache[request.url].data).toPromise() as Promise<any>;
      }

      /** if not loaded data yet, but it's in progress (by call this method)
       *  return loading Promise
       */
      if (this.requestCache[request.url] && this.requestCache[request.url].promise) {
        return this.requestCache[request.url].promise as Promise<any>;
      }
    } else if (this.requestCache[request.url]) {
      /** if cached this url, but now disabled. 
       *  Clear cache for this url.
      */
      this.requestCache[request.url] = undefined;
    }

    /** if GET request and missing params and exists body data
     *  put body to params and clear body
     */
    if (request.method.toUpperCase() == 'GET' && !request.params && request.body) {
      request.params = request.body;
      request.body = undefined;
    }

    const loadingPromise: Promise<any> = this.request(request.method, request.url, request)
      .pipe(tap(response =>  {
        /** data arrived from server
         *  if cache enabled put data into requestCache
         */
        if (request.enableCache) {
          this.requestCache[request.url].promise = null;
          this.requestCache[request.url].data = response;
        }
        return response;
      }))
      .toPromise() as Promise<any>;
    
    /** start loading process
     *  save request Promise to cache for next calls
     */
    if (request.enableCache) {
      this.requestCache[request.url] = {};
      this.requestCache[request.url].promise = loadingPromise;
    }

    /** return original loading promise for first caller
     *  next calls served from requestCache
     */
    return loadingPromise;
  }
}