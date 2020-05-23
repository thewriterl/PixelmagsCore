import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerMagazine } from 'app/shared/model/customer-magazine.model';
import { CustomerMagazineService } from './customer-magazine.service';

@Component({
  templateUrl: './customer-magazine-delete-dialog.component.html',
})
export class CustomerMagazineDeleteDialogComponent {
  customer?: ICustomerMagazine;

  constructor(
    protected customerService: CustomerMagazineService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.customerService.delete(id).subscribe(() => {
      this.eventManager.broadcast('customerListModification');
      this.activeModal.close();
    });
  }
}
