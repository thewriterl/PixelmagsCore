import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { SubscriptionPlanMagazineDetailComponent } from 'app/entities/subscription-plan-magazine/subscription-plan-magazine-detail.component';
import { SubscriptionPlanMagazine } from 'app/shared/model/subscription-plan-magazine.model';

describe('Component Tests', () => {
  describe('SubscriptionPlanMagazine Management Detail Component', () => {
    let comp: SubscriptionPlanMagazineDetailComponent;
    let fixture: ComponentFixture<SubscriptionPlanMagazineDetailComponent>;
    const route = ({ data: of({ subscriptionPlan: new SubscriptionPlanMagazine(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [SubscriptionPlanMagazineDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SubscriptionPlanMagazineDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubscriptionPlanMagazineDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load subscriptionPlan on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.subscriptionPlan).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
