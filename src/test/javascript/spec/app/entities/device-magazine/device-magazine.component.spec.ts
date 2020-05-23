import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { DeviceMagazineComponent } from 'app/entities/device-magazine/device-magazine.component';
import { DeviceMagazineService } from 'app/entities/device-magazine/device-magazine.service';
import { DeviceMagazine } from 'app/shared/model/device-magazine.model';

describe('Component Tests', () => {
  describe('DeviceMagazine Management Component', () => {
    let comp: DeviceMagazineComponent;
    let fixture: ComponentFixture<DeviceMagazineComponent>;
    let service: DeviceMagazineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [DeviceMagazineComponent],
      })
        .overrideTemplate(DeviceMagazineComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DeviceMagazineComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DeviceMagazineService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DeviceMagazine(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.devices && comp.devices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
