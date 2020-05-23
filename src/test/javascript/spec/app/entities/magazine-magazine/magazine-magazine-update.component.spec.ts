import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { MagazineMagazineUpdateComponent } from 'app/entities/magazine-magazine/magazine-magazine-update.component';
import { MagazineMagazineService } from 'app/entities/magazine-magazine/magazine-magazine.service';
import { MagazineMagazine } from 'app/shared/model/magazine-magazine.model';

describe('Component Tests', () => {
  describe('MagazineMagazine Management Update Component', () => {
    let comp: MagazineMagazineUpdateComponent;
    let fixture: ComponentFixture<MagazineMagazineUpdateComponent>;
    let service: MagazineMagazineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [MagazineMagazineUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MagazineMagazineUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MagazineMagazineUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MagazineMagazineService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MagazineMagazine(123);
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
        const entity = new MagazineMagazine();
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
