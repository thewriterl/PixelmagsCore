import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { DeviceMagazineUpdateComponent } from 'app/entities/device-magazine/device-magazine-update.component';
import { DeviceMagazineService } from 'app/entities/device-magazine/device-magazine.service';
import { DeviceMagazine } from 'app/shared/model/device-magazine.model';

describe('Component Tests', () => {
  describe('DeviceMagazine Management Update Component', () => {
    let comp: DeviceMagazineUpdateComponent;
    let fixture: ComponentFixture<DeviceMagazineUpdateComponent>;
    let service: DeviceMagazineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [DeviceMagazineUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DeviceMagazineUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DeviceMagazineUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DeviceMagazineService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DeviceMagazine(123);
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
        const entity = new DeviceMagazine();
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
