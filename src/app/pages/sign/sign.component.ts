import {Component, OnInit} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {
  close = false;
  deviceInfo;
  isMobile;
  isTablet;
  isDesktopDevice;

  constructor(private deviceService: DeviceDetectorService) {
  }

  ngOnInit(): void {
    this.getOS();
  }

  getOS(){
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();

    console.log(this.deviceInfo);
    console.log(this.isDesktopDevice);
    console.log(this.isMobile);
    console.log(this.isTablet);

  }
}
