import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { DeviceMagazineDetailComponent } from 'app/entities/device-magazine/device-magazine-detail.component';
import { DeviceMagazine } from 'app/shared/model/device-magazine.model';

describe('Component Tests', () => {
  describe('DeviceMagazine Management Detail Component', () => {
    let comp: DeviceMagazineDetailComponent;
    let fixture: ComponentFixture<DeviceMagazineDetailComponent>;
    const route = ({ data: of({ device: new DeviceMagazine(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [DeviceMagazineDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DeviceMagazineDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DeviceMagazineDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load device on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.device).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
