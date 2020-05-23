import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPurchaseMagazine } from 'app/shared/model/purchase-magazine.model';
import { PurchaseMagazineService } from './purchase-magazine.service';
import { PurchaseMagazineDeleteDialogComponent } from './purchase-magazine-delete-dialog.component';

@Component({
  selector: 'jhi-purchase-magazine',
  templateUrl: './purchase-magazine.component.html',
})
export class PurchaseMagazineComponent implements OnInit, OnDestroy {
  purchases?: IPurchaseMagazine[];
  eventSubscriber?: Subscription;

  constructor(
    protected purchaseService: PurchaseMagazineService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.purchaseService.query().subscribe((res: HttpResponse<IPurchaseMagazine[]>) => (this.purchases = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPurchases();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPurchaseMagazine): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPurchases(): void {
    this.eventSubscriber = this.eventManager.subscribe('purchaseListModification', () => this.loadAll());
  }

  delete(purchase: IPurchaseMagazine): void {
    const modalRef = this.modalService.open(PurchaseMagazineDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.purchase = purchase;
  }
}
