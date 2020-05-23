import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { IssueMagazineUpdateComponent } from 'app/entities/issue-magazine/issue-magazine-update.component';
import { IssueMagazineService } from 'app/entities/issue-magazine/issue-magazine.service';
import { IssueMagazine } from 'app/shared/model/issue-magazine.model';

describe('Component Tests', () => {
  describe('IssueMagazine Management Update Component', () => {
    let comp: IssueMagazineUpdateComponent;
    let fixture: ComponentFixture<IssueMagazineUpdateComponent>;
    let service: IssueMagazineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [IssueMagazineUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(IssueMagazineUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IssueMagazineUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IssueMagazineService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new IssueMagazine(123);
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
        const entity = new IssueMagazine();
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
