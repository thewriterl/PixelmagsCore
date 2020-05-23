import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { CustomerMagazineComponent } from 'app/entities/customer-magazine/customer-magazine.component';
import { CustomerMagazineService } from 'app/entities/customer-magazine/customer-magazine.service';
import { CustomerMagazine } from 'app/shared/model/customer-magazine.model';

describe('Component Tests', () => {
  describe('CustomerMagazine Management Component', () => {
    let comp: CustomerMagazineComponent;
    let fixture: ComponentFixture<CustomerMagazineComponent>;
    let service: CustomerMagazineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [CustomerMagazineComponent],
      })
        .overrideTemplate(CustomerMagazineComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerMagazineComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerMagazineService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CustomerMagazine(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.customers && comp.customers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
