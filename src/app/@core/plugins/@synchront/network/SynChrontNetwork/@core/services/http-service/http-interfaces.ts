export interface HttpRequest {
    method?: string
    url: string
    params?: { [key: string]: string }
    data?: { [key: string]: string }
    headers?: { [key: string]: string }
    auth?: boolean

}


export interface HttpRequestDefaults {
    method:string,
    auth:boolean,
    headers:{ [key: string]: string }
}