import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { LogMagazineComponent } from 'app/entities/log-magazine/log-magazine.component';
import { LogMagazineService } from 'app/entities/log-magazine/log-magazine.service';
import { LogMagazine } from 'app/shared/model/log-magazine.model';

describe('Component Tests', () => {
  describe('LogMagazine Management Component', () => {
    let comp: LogMagazineComponent;
    let fixture: ComponentFixture<LogMagazineComponent>;
    let service: LogMagazineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [LogMagazineComponent],
      })
        .overrideTemplate(LogMagazineComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LogMagazineComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LogMagazineService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LogMagazine(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.logs && comp.logs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
