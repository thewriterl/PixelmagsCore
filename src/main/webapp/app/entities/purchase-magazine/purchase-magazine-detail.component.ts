import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPurchaseMagazine } from 'app/shared/model/purchase-magazine.model';

@Component({
  selector: 'jhi-purchase-magazine-detail',
  templateUrl: './purchase-magazine-detail.component.html',
})
export class PurchaseMagazineDetailComponent implements OnInit {
  purchase: IPurchaseMagazine | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ purchase }) => (this.purchase = purchase));
  }

  previousState(): void {
    window.history.back();
  }
}
