import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILogMagazine } from 'app/shared/model/log-magazine.model';
import { LogMagazineService } from './log-magazine.service';
import { LogMagazineDeleteDialogComponent } from './log-magazine-delete-dialog.component';

@Component({
  selector: 'jhi-log-magazine',
  templateUrl: './log-magazine.component.html',
})
export class LogMagazineComponent implements OnInit, OnDestroy {
  logs?: ILogMagazine[];
  eventSubscriber?: Subscription;

  constructor(protected logService: LogMagazineService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.logService.query().subscribe((res: HttpResponse<ILogMagazine[]>) => (this.logs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLogs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILogMagazine): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLogs(): void {
    this.eventSubscriber = this.eventManager.subscribe('logListModification', () => this.loadAll());
  }

  delete(log: ILogMagazine): void {
    const modalRef = this.modalService.open(LogMagazineDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.log = log;
  }
}
