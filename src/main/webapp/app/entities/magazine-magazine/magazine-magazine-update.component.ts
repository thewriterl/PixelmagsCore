import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMagazineMagazine, MagazineMagazine } from 'app/shared/model/magazine-magazine.model';
import { MagazineMagazineService } from './magazine-magazine.service';
import { IIssueMagazine } from 'app/shared/model/issue-magazine.model';
import { IssueMagazineService } from 'app/entities/issue-magazine/issue-magazine.service';
import { IPurchaseMagazine } from 'app/shared/model/purchase-magazine.model';
import { PurchaseMagazineService } from 'app/entities/purchase-magazine/purchase-magazine.service';
import { IPublisherMagazine } from 'app/shared/model/publisher-magazine.model';
import { PublisherMagazineService } from 'app/entities/publisher-magazine/publisher-magazine.service';

type SelectableEntity = IIssueMagazine | IPurchaseMagazine | IPublisherMagazine;

@Component({
  selector: 'jhi-magazine-magazine-update',
  templateUrl: './magazine-magazine-update.component.html',
})
export class MagazineMagazineUpdateComponent implements OnInit {
  isSaving = false;
  issues: IIssueMagazine[] = [];
  purchases: IPurchaseMagazine[] = [];
  publishers: IPublisherMagazine[] = [];

  editForm = this.fb.group({
    id: [],
    codigoRevista: [],
    preco: [],
    issueId: [],
    purchaseId: [],
    publisherId: [],
  });

  constructor(
    protected magazineService: MagazineMagazineService,
    protected issueService: IssueMagazineService,
    protected purchaseService: PurchaseMagazineService,
    protected publisherService: PublisherMagazineService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ magazine }) => {
      this.updateForm(magazine);

      this.issueService
        .query({ filter: 'magazine-is-null' })
        .pipe(
          map((res: HttpResponse<IIssueMagazine[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IIssueMagazine[]) => {
          if (!magazine.issueId) {
            this.issues = resBody;
          } else {
            this.issueService
              .find(magazine.issueId)
              .pipe(
                map((subRes: HttpResponse<IIssueMagazine>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IIssueMagazine[]) => (this.issues = concatRes));
          }
        });

      this.purchaseService
        .query({ filter: 'magazine-is-null' })
        .pipe(
          map((res: HttpResponse<IPurchaseMagazine[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPurchaseMagazine[]) => {
          if (!magazine.purchaseId) {
            this.purchases = resBody;
          } else {
            this.purchaseService
              .find(magazine.purchaseId)
              .pipe(
                map((subRes: HttpResponse<IPurchaseMagazine>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPurchaseMagazine[]) => (this.purchases = concatRes));
          }
        });

      this.publisherService.query().subscribe((res: HttpResponse<IPublisherMagazine[]>) => (this.publishers = res.body || []));
    });
  }

  updateForm(magazine: IMagazineMagazine): void {
    this.editForm.patchValue({
      id: magazine.id,
      codigoRevista: magazine.codigoRevista,
      preco: magazine.preco,
      issueId: magazine.issueId,
      purchaseId: magazine.purchaseId,
      publisherId: magazine.publisherId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const magazine = this.createFromForm();
    if (magazine.id !== undefined) {
      this.subscribeToSaveResponse(this.magazineService.update(magazine));
    } else {
      this.subscribeToSaveResponse(this.magazineService.create(magazine));
    }
  }

  private createFromForm(): IMagazineMagazine {
    return {
      ...new MagazineMagazine(),
      id: this.editForm.get(['id'])!.value,
      codigoRevista: this.editForm.get(['codigoRevista'])!.value,
      preco: this.editForm.get(['preco'])!.value,
      issueId: this.editForm.get(['issueId'])!.value,
      purchaseId: this.editForm.get(['purchaseId'])!.value,
      publisherId: this.editForm.get(['publisherId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMagazineMagazine>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
