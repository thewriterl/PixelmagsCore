import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILogMagazine } from 'app/shared/model/log-magazine.model';
import { LogMagazineService } from './log-magazine.service';

@Component({
  templateUrl: './log-magazine-delete-dialog.component.html',
})
export class LogMagazineDeleteDialogComponent {
  log?: ILogMagazine;

  constructor(protected logService: LogMagazineService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.logService.delete(id).subscribe(() => {
      this.eventManager.broadcast('logListModification');
      this.activeModal.close();
    });
  }
}
