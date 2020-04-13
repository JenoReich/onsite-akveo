import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpRequest {
    method?: string;
    url: string;
    params?: HttpParams;
    body?: any;
    headers?: HttpHeaders;
    withCredentials?: boolean;
    enableCache?: boolean;
}

export interface HttpRequestDefaults {
    method: string;
    withCredentials: boolean;
    headers: { [key: string]: string };
    enableCache: boolean;
}