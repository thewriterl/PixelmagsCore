import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPurchaseMagazine, PurchaseMagazine } from 'app/shared/model/purchase-magazine.model';
import { PurchaseMagazineService } from './purchase-magazine.service';
import { ISubscriptionPlanMagazine } from 'app/shared/model/subscription-plan-magazine.model';
import { SubscriptionPlanMagazineService } from 'app/entities/subscription-plan-magazine/subscription-plan-magazine.service';

@Component({
  selector: 'jhi-purchase-magazine-update',
  templateUrl: './purchase-magazine-update.component.html',
})
export class PurchaseMagazineUpdateComponent implements OnInit {
  isSaving = false;
  subscriptions: ISubscriptionPlanMagazine[] = [];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [],
    tipo: [],
    subscriptionId: [],
  });

  constructor(
    protected purchaseService: PurchaseMagazineService,
    protected subscriptionPlanService: SubscriptionPlanMagazineService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ purchase }) => {
      this.updateForm(purchase);

      this.subscriptionPlanService
        .query({ filter: 'purchase-is-null' })
        .pipe(
          map((res: HttpResponse<ISubscriptionPlanMagazine[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ISubscriptionPlanMagazine[]) => {
          if (!purchase.subscriptionId) {
            this.subscriptions = resBody;
          } else {
            this.subscriptionPlanService
              .find(purchase.subscriptionId)
              .pipe(
                map((subRes: HttpResponse<ISubscriptionPlanMagazine>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ISubscriptionPlanMagazine[]) => (this.subscriptions = concatRes));
          }
        });
    });
  }

  updateForm(purchase: IPurchaseMagazine): void {
    this.editForm.patchValue({
      id: purchase.id,
      date: purchase.date,
      tipo: purchase.tipo,
      subscriptionId: purchase.subscriptionId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const purchase = this.createFromForm();
    if (purchase.id !== undefined) {
      this.subscribeToSaveResponse(this.purchaseService.update(purchase));
    } else {
      this.subscribeToSaveResponse(this.purchaseService.create(purchase));
    }
  }

  private createFromForm(): IPurchaseMagazine {
    return {
      ...new PurchaseMagazine(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      subscriptionId: this.editForm.get(['subscriptionId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPurchaseMagazine>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ISubscriptionPlanMagazine): any {
    return item.id;
  }
}
