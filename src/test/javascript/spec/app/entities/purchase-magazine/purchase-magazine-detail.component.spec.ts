import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { PurchaseMagazineDetailComponent } from 'app/entities/purchase-magazine/purchase-magazine-detail.component';
import { PurchaseMagazine } from 'app/shared/model/purchase-magazine.model';

describe('Component Tests', () => {
  describe('PurchaseMagazine Management Detail Component', () => {
    let comp: PurchaseMagazineDetailComponent;
    let fixture: ComponentFixture<PurchaseMagazineDetailComponent>;
    const route = ({ data: of({ purchase: new PurchaseMagazine(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [PurchaseMagazineDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PurchaseMagazineDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PurchaseMagazineDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load purchase on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.purchase).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
