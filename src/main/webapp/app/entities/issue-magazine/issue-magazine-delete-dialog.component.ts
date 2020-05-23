import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIssueMagazine } from 'app/shared/model/issue-magazine.model';
import { IssueMagazineService } from './issue-magazine.service';

@Component({
  templateUrl: './issue-magazine-delete-dialog.component.html',
})
export class IssueMagazineDeleteDialogComponent {
  issue?: IIssueMagazine;

  constructor(protected issueService: IssueMagazineService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.issueService.delete(id).subscribe(() => {
      this.eventManager.broadcast('issueListModification');
      this.activeModal.close();
    });
  }
}
