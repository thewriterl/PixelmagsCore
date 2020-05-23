import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { CustomerMagazineDetailComponent } from 'app/entities/customer-magazine/customer-magazine-detail.component';
import { CustomerMagazine } from 'app/shared/model/customer-magazine.model';

describe('Component Tests', () => {
  describe('CustomerMagazine Management Detail Component', () => {
    let comp: CustomerMagazineDetailComponent;
    let fixture: ComponentFixture<CustomerMagazineDetailComponent>;
    const route = ({ data: of({ customer: new CustomerMagazine(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [CustomerMagazineDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CustomerMagazineDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomerMagazineDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load customer on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.customer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
