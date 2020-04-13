export interface ServiceDataPack{
    serviceID?:string,
    device_activity?:string,
}


export class DefaultServiceDataPack{
    serviceID?:string="";
    device_activity?:string="";
}