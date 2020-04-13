
export interface DeviceDataPack{
    locationID?:string;
    stageID?:string;
    stageTypeID?:string;
    deviceID?:string;
    devicePositionID?:string;
    serviceIDS?:string[];
    device_activity?:string;
    deviceproperty_value?:string;
    systemID?:string;
    
}

export class DefaultDeviceDataPack{
    locationID?:string="";
    stageID?:string="";
    stageTypeID?:string="";
    deviceID?:string="";
    devicePositionID?:string="";
    serviceIDS?:string[]=[];
    device_activity?:string="";
    deviceproperty_value?:string="";
    systemID?:string="";
}