import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMagazineMagazine } from 'app/shared/model/magazine-magazine.model';
import { MagazineMagazineService } from './magazine-magazine.service';

@Component({
  templateUrl: './magazine-magazine-delete-dialog.component.html',
})
export class MagazineMagazineDeleteDialogComponent {
  magazine?: IMagazineMagazine;

  constructor(
    protected magazineService: MagazineMagazineService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.magazineService.delete(id).subscribe(() => {
      this.eventManager.broadcast('magazineListModification');
      this.activeModal.close();
    });
  }
}
