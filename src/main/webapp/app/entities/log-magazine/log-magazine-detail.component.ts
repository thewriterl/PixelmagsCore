import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILogMagazine } from 'app/shared/model/log-magazine.model';

@Component({
  selector: 'jhi-log-magazine-detail',
  templateUrl: './log-magazine-detail.component.html',
})
export class LogMagazineDetailComponent implements OnInit {
  log: ILogMagazine | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ log }) => (this.log = log));
  }

  previousState(): void {
    window.history.back();
  }
}
