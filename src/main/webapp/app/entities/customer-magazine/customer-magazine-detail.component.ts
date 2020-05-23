import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerMagazine } from 'app/shared/model/customer-magazine.model';

@Component({
  selector: 'jhi-customer-magazine-detail',
  templateUrl: './customer-magazine-detail.component.html',
})
export class CustomerMagazineDetailComponent implements OnInit {
  customer: ICustomerMagazine | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customer }) => (this.customer = customer));
  }

  previousState(): void {
    window.history.back();
  }
}
