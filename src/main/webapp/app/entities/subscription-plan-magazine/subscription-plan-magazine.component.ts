import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubscriptionPlanMagazine } from 'app/shared/model/subscription-plan-magazine.model';
import { SubscriptionPlanMagazineService } from './subscription-plan-magazine.service';
import { SubscriptionPlanMagazineDeleteDialogComponent } from './subscription-plan-magazine-delete-dialog.component';

@Component({
  selector: 'jhi-subscription-plan-magazine',
  templateUrl: './subscription-plan-magazine.component.html',
})
export class SubscriptionPlanMagazineComponent implements OnInit, OnDestroy {
  subscriptionPlans?: ISubscriptionPlanMagazine[];
  eventSubscriber?: Subscription;

  constructor(
    protected subscriptionPlanService: SubscriptionPlanMagazineService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.subscriptionPlanService
      .query()
      .subscribe((res: HttpResponse<ISubscriptionPlanMagazine[]>) => (this.subscriptionPlans = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSubscriptionPlans();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISubscriptionPlanMagazine): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSubscriptionPlans(): void {
    this.eventSubscriber = this.eventManager.subscribe('subscriptionPlanListModification', () => this.loadAll());
  }

  delete(subscriptionPlan: ISubscriptionPlanMagazine): void {
    const modalRef = this.modalService.open(SubscriptionPlanMagazineDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subscriptionPlan = subscriptionPlan;
  }
}
