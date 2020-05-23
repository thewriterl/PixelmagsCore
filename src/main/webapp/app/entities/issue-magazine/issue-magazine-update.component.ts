import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IIssueMagazine, IssueMagazine } from 'app/shared/model/issue-magazine.model';
import { IssueMagazineService } from './issue-magazine.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-issue-magazine-update',
  templateUrl: './issue-magazine-update.component.html',
})
export class IssueMagazineUpdateComponent implements OnInit {
  isSaving = false;
  dataLancamentoDp: any;

  editForm = this.fb.group({
    id: [],
    edicao: [],
    manchete: [],
    dataLancamento: [],
    descricao: [],
    numeroPaginas: [],
    url: [],
    coverThumbnail: [],
    coverThumbnailContentType: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected issueService: IssueMagazineService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ issue }) => {
      this.updateForm(issue);
    });
  }

  updateForm(issue: IIssueMagazine): void {
    this.editForm.patchValue({
      id: issue.id,
      edicao: issue.edicao,
      manchete: issue.manchete,
      dataLancamento: issue.dataLancamento,
      descricao: issue.descricao,
      numeroPaginas: issue.numeroPaginas,
      url: issue.url,
      coverThumbnail: issue.coverThumbnail,
      coverThumbnailContentType: issue.coverThumbnailContentType,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('pixelmagsCoreApp.error', { message: err.message })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const issue = this.createFromForm();
    if (issue.id !== undefined) {
      this.subscribeToSaveResponse(this.issueService.update(issue));
    } else {
      this.subscribeToSaveResponse(this.issueService.create(issue));
    }
  }

  private createFromForm(): IIssueMagazine {
    return {
      ...new IssueMagazine(),
      id: this.editForm.get(['id'])!.value,
      edicao: this.editForm.get(['edicao'])!.value,
      manchete: this.editForm.get(['manchete'])!.value,
      dataLancamento: this.editForm.get(['dataLancamento'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      numeroPaginas: this.editForm.get(['numeroPaginas'])!.value,
      url: this.editForm.get(['url'])!.value,
      coverThumbnailContentType: this.editForm.get(['coverThumbnailContentType'])!.value,
      coverThumbnail: this.editForm.get(['coverThumbnail'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIssueMagazine>>): void {
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
