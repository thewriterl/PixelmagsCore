import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { LogMagazineUpdateComponent } from 'app/entities/log-magazine/log-magazine-update.component';
import { LogMagazineService } from 'app/entities/log-magazine/log-magazine.service';
import { LogMagazine } from 'app/shared/model/log-magazine.model';

describe('Component Tests', () => {
  describe('LogMagazine Management Update Component', () => {
    let comp: LogMagazineUpdateComponent;
    let fixture: ComponentFixture<LogMagazineUpdateComponent>;
    let service: LogMagazineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [LogMagazineUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LogMagazineUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LogMagazineUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LogMagazineService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LogMagazine(123);
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
        const entity = new LogMagazine();
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
