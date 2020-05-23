import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPublisherMagazine, PublisherMagazine } from 'app/shared/model/publisher-magazine.model';
import { PublisherMagazineService } from './publisher-magazine.service';

@Component({
  selector: 'jhi-publisher-magazine-update',
  templateUrl: './publisher-magazine-update.component.html',
})
export class PublisherMagazineUpdateComponent implements OnInit {
  isSaving = false;
  dataCadastroDp: any;

  editForm = this.fb.group({
    id: [],
    nome: [],
    dataCadastro: [],
  });

  constructor(protected publisherService: PublisherMagazineService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ publisher }) => {
      this.updateForm(publisher);
    });
  }

  updateForm(publisher: IPublisherMagazine): void {
    this.editForm.patchValue({
      id: publisher.id,
      nome: publisher.nome,
      dataCadastro: publisher.dataCadastro,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const publisher = this.createFromForm();
    if (publisher.id !== undefined) {
      this.subscribeToSaveResponse(this.publisherService.update(publisher));
    } else {
      this.subscribeToSaveResponse(this.publisherService.create(publisher));
    }
  }

  private createFromForm(): IPublisherMagazine {
    return {
      ...new PublisherMagazine(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      dataCadastro: this.editForm.get(['dataCadastro'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPublisherMagazine>>): void {
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
