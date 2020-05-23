import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeviceMagazine } from 'app/shared/model/device-magazine.model';

@Component({
  selector: 'jhi-device-magazine-detail',
  templateUrl: './device-magazine-detail.component.html',
})
export class DeviceMagazineDetailComponent implements OnInit {
  device: IDeviceMagazine | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ device }) => (this.device = device));
  }

  previousState(): void {
    window.history.back();
  }
}
