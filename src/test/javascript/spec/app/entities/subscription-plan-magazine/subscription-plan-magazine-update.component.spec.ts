import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { SubscriptionPlanMagazineUpdateComponent } from 'app/entities/subscription-plan-magazine/subscription-plan-magazine-update.component';
import { SubscriptionPlanMagazineService } from 'app/entities/subscription-plan-magazine/subscription-plan-magazine.service';
import { SubscriptionPlanMagazine } from 'app/shared/model/subscription-plan-magazine.model';

describe('Component Tests', () => {
  describe('SubscriptionPlanMagazine Management Update Component', () => {
    let comp: SubscriptionPlanMagazineUpdateComponent;
    let fixture: ComponentFixture<SubscriptionPlanMagazineUpdateComponent>;
    let service: SubscriptionPlanMagazineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [SubscriptionPlanMagazineUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SubscriptionPlanMagazineUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubscriptionPlanMagazineUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubscriptionPlanMagazineService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SubscriptionPlanMagazine(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new SubscriptionPlanMagazine();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
