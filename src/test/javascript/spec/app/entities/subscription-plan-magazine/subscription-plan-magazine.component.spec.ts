import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { SubscriptionPlanMagazineComponent } from 'app/entities/subscription-plan-magazine/subscription-plan-magazine.component';
import { SubscriptionPlanMagazineService } from 'app/entities/subscription-plan-magazine/subscription-plan-magazine.service';
import { SubscriptionPlanMagazine } from 'app/shared/model/subscription-plan-magazine.model';

describe('Component Tests', () => {
  describe('SubscriptionPlanMagazine Management Component', () => {
    let comp: SubscriptionPlanMagazineComponent;
    let fixture: ComponentFixture<SubscriptionPlanMagazineComponent>;
    let service: SubscriptionPlanMagazineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [SubscriptionPlanMagazineComponent],
      })
        .overrideTemplate(SubscriptionPlanMagazineComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubscriptionPlanMagazineComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubscriptionPlanMagazineService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SubscriptionPlanMagazine(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.subscriptionPlans && comp.subscriptionPlans[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
