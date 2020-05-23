import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPublisherMagazine } from 'app/shared/model/publisher-magazine.model';
import { PublisherMagazineService } from './publisher-magazine.service';

@Component({
  templateUrl: './publisher-magazine-delete-dialog.component.html',
})
export class PublisherMagazineDeleteDialogComponent {
  publisher?: IPublisherMagazine;

  constructor(
    protected publisherService: PublisherMagazineService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.publisherService.delete(id).subscribe(() => {
      this.eventManager.broadcast('publisherListModification');
      this.activeModal.close();
    });
  }
}
