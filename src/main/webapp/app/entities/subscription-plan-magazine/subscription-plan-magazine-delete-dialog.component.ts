import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubscriptionPlanMagazine } from 'app/shared/model/subscription-plan-magazine.model';
import { SubscriptionPlanMagazineService } from './subscription-plan-magazine.service';

@Component({
  templateUrl: './subscription-plan-magazine-delete-dialog.component.html',
})
export class SubscriptionPlanMagazineDeleteDialogComponent {
  subscriptionPlan?: ISubscriptionPlanMagazine;

  constructor(
    protected subscriptionPlanService: SubscriptionPlanMagazineService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.subscriptionPlanService.delete(id).subscribe(() => {
      this.eventManager.broadcast('subscriptionPlanListModification');
      this.activeModal.close();
    });
  }
}
