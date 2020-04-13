import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivateChild {

  public x: boolean;
  public URL: string = 'https://intranet-dev.art1st.hu/ng-api/knowledge-base';


  constructor(private http: HttpClient) {
    this.getDataFromServer();
  }

  canActivateChild(): boolean {
    if (this.x == false) {

      // console.log("hiba");
      this.redirect();
      return false;
    } else if (this.x == true) {
      // console.log("logged in");
      //return true;
    }

  }

  redirect() {
    // window.location.href = 'https://intranet-dev.art1st.hu/login';

  }



  getDataFromServer(): Promise<any> {
    return this.http.get(this.URL, { withCredentials: false }).toPromise().then(
      () => {

        this.x = true;
        // console.log("then branch");
        this.canActivateChild();

      }

    ).catch(
      () => {

        this.x = false;
        // console.log("catch branch");
        this.canActivateChild()

      }

    ) as Promise<any>;
  }




}


