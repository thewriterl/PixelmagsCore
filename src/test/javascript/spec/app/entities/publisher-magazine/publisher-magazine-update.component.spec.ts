import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { PublisherMagazineUpdateComponent } from 'app/entities/publisher-magazine/publisher-magazine-update.component';
import { PublisherMagazineService } from 'app/entities/publisher-magazine/publisher-magazine.service';
import { PublisherMagazine } from 'app/shared/model/publisher-magazine.model';

describe('Component Tests', () => {
  describe('PublisherMagazine Management Update Component', () => {
    let comp: PublisherMagazineUpdateComponent;
    let fixture: ComponentFixture<PublisherMagazineUpdateComponent>;
    let service: PublisherMagazineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [PublisherMagazineUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PublisherMagazineUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PublisherMagazineUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PublisherMagazineService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PublisherMagazine(123);
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
        const entity = new PublisherMagazine();
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
