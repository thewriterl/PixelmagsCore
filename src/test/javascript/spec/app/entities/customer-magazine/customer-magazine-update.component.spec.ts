import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { CustomerMagazineUpdateComponent } from 'app/entities/customer-magazine/customer-magazine-update.component';
import { CustomerMagazineService } from 'app/entities/customer-magazine/customer-magazine.service';
import { CustomerMagazine } from 'app/shared/model/customer-magazine.model';

describe('Component Tests', () => {
  describe('CustomerMagazine Management Update Component', () => {
    let comp: CustomerMagazineUpdateComponent;
    let fixture: ComponentFixture<CustomerMagazineUpdateComponent>;
    let service: CustomerMagazineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [CustomerMagazineUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CustomerMagazineUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerMagazineUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerMagazineService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CustomerMagazine(123);
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
        const entity = new CustomerMagazine();
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
