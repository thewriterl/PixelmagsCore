import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILogMagazine, LogMagazine } from 'app/shared/model/log-magazine.model';
import { LogMagazineService } from './log-magazine.service';

@Component({
  selector: 'jhi-log-magazine-update',
  templateUrl: './log-magazine-update.component.html',
})
export class LogMagazineUpdateComponent implements OnInit {
  isSaving = false;
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [],
    evento: [],
  });

  constructor(protected logService: LogMagazineService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ log }) => {
      this.updateForm(log);
    });
  }

  updateForm(log: ILogMagazine): void {
    this.editForm.patchValue({
      id: log.id,
      date: log.date,
      evento: log.evento,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const log = this.createFromForm();
    if (log.id !== undefined) {
      this.subscribeToSaveResponse(this.logService.update(log));
    } else {
      this.subscribeToSaveResponse(this.logService.create(log));
    }
  }

  private createFromForm(): ILogMagazine {
    return {
      ...new LogMagazine(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value,
      evento: this.editForm.get(['evento'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILogMagazine>>): void {
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
