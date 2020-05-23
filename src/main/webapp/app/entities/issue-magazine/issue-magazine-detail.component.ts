import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IIssueMagazine } from 'app/shared/model/issue-magazine.model';

@Component({
  selector: 'jhi-issue-magazine-detail',
  templateUrl: './issue-magazine-detail.component.html',
})
export class IssueMagazineDetailComponent implements OnInit {
  issue: IIssueMagazine | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ issue }) => (this.issue = issue));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
