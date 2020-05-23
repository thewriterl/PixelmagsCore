import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubscriptionPlanMagazine } from 'app/shared/model/subscription-plan-magazine.model';

@Component({
  selector: 'jhi-subscription-plan-magazine-detail',
  templateUrl: './subscription-plan-magazine-detail.component.html',
})
export class SubscriptionPlanMagazineDetailComponent implements OnInit {
  subscriptionPlan: ISubscriptionPlanMagazine | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subscriptionPlan }) => (this.subscriptionPlan = subscriptionPlan));
  }

  previousState(): void {
    window.history.back();
  }
}
