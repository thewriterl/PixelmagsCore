import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPurchaseMagazine } from 'app/shared/model/purchase-magazine.model';
import { PurchaseMagazineService } from './purchase-magazine.service';

@Component({
  templateUrl: './purchase-magazine-delete-dialog.component.html',
})
export class PurchaseMagazineDeleteDialogComponent {
  purchase?: IPurchaseMagazine;

  constructor(
    protected purchaseService: PurchaseMagazineService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.purchaseService.delete(id).subscribe(() => {
      this.eventManager.broadcast('purchaseListModification');
      this.activeModal.close();
    });
  }
}
