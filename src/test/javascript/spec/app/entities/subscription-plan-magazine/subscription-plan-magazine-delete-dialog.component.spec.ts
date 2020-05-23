import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { SubscriptionPlanMagazineDeleteDialogComponent } from 'app/entities/subscription-plan-magazine/subscription-plan-magazine-delete-dialog.component';
import { SubscriptionPlanMagazineService } from 'app/entities/subscription-plan-magazine/subscription-plan-magazine.service';

describe('Component Tests', () => {
  describe('SubscriptionPlanMagazine Management Delete Component', () => {
    let comp: SubscriptionPlanMagazineDeleteDialogComponent;
    let fixture: ComponentFixture<SubscriptionPlanMagazineDeleteDialogComponent>;
    let service: SubscriptionPlanMagazineService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [SubscriptionPlanMagazineDeleteDialogComponent],
      })
        .overrideTemplate(SubscriptionPlanMagazineDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubscriptionPlanMagazineDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubscriptionPlanMagazineService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
