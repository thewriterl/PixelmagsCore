import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { PurchaseMagazineComponent } from 'app/entities/purchase-magazine/purchase-magazine.component';
import { PurchaseMagazineService } from 'app/entities/purchase-magazine/purchase-magazine.service';
import { PurchaseMagazine } from 'app/shared/model/purchase-magazine.model';

describe('Component Tests', () => {
  describe('PurchaseMagazine Management Component', () => {
    let comp: PurchaseMagazineComponent;
    let fixture: ComponentFixture<PurchaseMagazineComponent>;
    let service: PurchaseMagazineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [PurchaseMagazineComponent],
      })
        .overrideTemplate(PurchaseMagazineComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PurchaseMagazineComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PurchaseMagazineService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PurchaseMagazine(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.purchases && comp.purchases[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
