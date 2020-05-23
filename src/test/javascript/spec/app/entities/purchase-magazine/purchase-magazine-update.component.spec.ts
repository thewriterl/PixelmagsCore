import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { PurchaseMagazineUpdateComponent } from 'app/entities/purchase-magazine/purchase-magazine-update.component';
import { PurchaseMagazineService } from 'app/entities/purchase-magazine/purchase-magazine.service';
import { PurchaseMagazine } from 'app/shared/model/purchase-magazine.model';

describe('Component Tests', () => {
  describe('PurchaseMagazine Management Update Component', () => {
    let comp: PurchaseMagazineUpdateComponent;
    let fixture: ComponentFixture<PurchaseMagazineUpdateComponent>;
    let service: PurchaseMagazineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [PurchaseMagazineUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PurchaseMagazineUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PurchaseMagazineUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PurchaseMagazineService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PurchaseMagazine(123);
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
        const entity = new PurchaseMagazine();
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
