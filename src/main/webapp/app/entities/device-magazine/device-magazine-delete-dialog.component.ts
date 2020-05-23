import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDeviceMagazine } from 'app/shared/model/device-magazine.model';
import { DeviceMagazineService } from './device-magazine.service';

@Component({
  templateUrl: './device-magazine-delete-dialog.component.html',
})
export class DeviceMagazineDeleteDialogComponent {
  device?: IDeviceMagazine;

  constructor(
    protected deviceService: DeviceMagazineService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.deviceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('deviceListModification');
      this.activeModal.close();
    });
  }
}
