import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICustomerMagazine, CustomerMagazine } from 'app/shared/model/customer-magazine.model';
import { CustomerMagazineService } from './customer-magazine.service';
import { IPurchaseMagazine } from 'app/shared/model/purchase-magazine.model';
import { PurchaseMagazineService } from 'app/entities/purchase-magazine/purchase-magazine.service';

@Component({
  selector: 'jhi-customer-magazine-update',
  templateUrl: './customer-magazine-update.component.html',
})
export class CustomerMagazineUpdateComponent implements OnInit {
  isSaving = false;
  purchases: IPurchaseMagazine[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    email: [],
    fcm: [],
    purchasesId: [],
  });

  constructor(
    protected customerService: CustomerMagazineService,
    protected purchaseService: PurchaseMagazineService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customer }) => {
      this.updateForm(customer);

      this.purchaseService.query().subscribe((res: HttpResponse<IPurchaseMagazine[]>) => (this.purchases = res.body || []));
    });
  }

  updateForm(customer: ICustomerMagazine): void {
    this.editForm.patchValue({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      fcm: customer.fcm,
      purchasesId: customer.purchasesId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customer = this.createFromForm();
    if (customer.id !== undefined) {
      this.subscribeToSaveResponse(this.customerService.update(customer));
    } else {
      this.subscribeToSaveResponse(this.customerService.create(customer));
    }
  }

  private createFromForm(): ICustomerMagazine {
    return {
      ...new CustomerMagazine(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      email: this.editForm.get(['email'])!.value,
      fcm: this.editForm.get(['fcm'])!.value,
      purchasesId: this.editForm.get(['purchasesId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerMagazine>>): void {
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

  trackById(index: number, item: IPurchaseMagazine): any {
    return item.id;
  }
}
