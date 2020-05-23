import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISubscriptionPlanMagazine, SubscriptionPlanMagazine } from 'app/shared/model/subscription-plan-magazine.model';
import { SubscriptionPlanMagazineService } from './subscription-plan-magazine.service';

@Component({
  selector: 'jhi-subscription-plan-magazine-update',
  templateUrl: './subscription-plan-magazine-update.component.html',
})
export class SubscriptionPlanMagazineUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
    preco: [],
    periodo: [],
  });

  constructor(
    protected subscriptionPlanService: SubscriptionPlanMagazineService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subscriptionPlan }) => {
      this.updateForm(subscriptionPlan);
    });
  }

  updateForm(subscriptionPlan: ISubscriptionPlanMagazine): void {
    this.editForm.patchValue({
      id: subscriptionPlan.id,
      nome: subscriptionPlan.nome,
      preco: subscriptionPlan.preco,
      periodo: subscriptionPlan.periodo,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subscriptionPlan = this.createFromForm();
    if (subscriptionPlan.id !== undefined) {
      this.subscribeToSaveResponse(this.subscriptionPlanService.update(subscriptionPlan));
    } else {
      this.subscribeToSaveResponse(this.subscriptionPlanService.create(subscriptionPlan));
    }
  }

  private createFromForm(): ISubscriptionPlanMagazine {
    return {
      ...new SubscriptionPlanMagazine(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      preco: this.editForm.get(['preco'])!.value,
      periodo: this.editForm.get(['periodo'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubscriptionPlanMagazine>>): void {
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
}
