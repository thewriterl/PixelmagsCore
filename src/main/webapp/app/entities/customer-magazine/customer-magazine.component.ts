import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICustomerMagazine } from 'app/shared/model/customer-magazine.model';
import { CustomerMagazineService } from './customer-magazine.service';
import { CustomerMagazineDeleteDialogComponent } from './customer-magazine-delete-dialog.component';

@Component({
  selector: 'jhi-customer-magazine',
  templateUrl: './customer-magazine.component.html',
})
export class CustomerMagazineComponent implements OnInit, OnDestroy {
  customers?: ICustomerMagazine[];
  eventSubscriber?: Subscription;

  constructor(
    protected customerService: CustomerMagazineService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.customerService.query().subscribe((res: HttpResponse<ICustomerMagazine[]>) => (this.customers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCustomers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICustomerMagazine): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCustomers(): void {
    this.eventSubscriber = this.eventManager.subscribe('customerListModification', () => this.loadAll());
  }

  delete(customer: ICustomerMagazine): void {
    const modalRef = this.modalService.open(CustomerMagazineDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.customer = customer;
  }
}
