import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { PublisherMagazineComponent } from 'app/entities/publisher-magazine/publisher-magazine.component';
import { PublisherMagazineService } from 'app/entities/publisher-magazine/publisher-magazine.service';
import { PublisherMagazine } from 'app/shared/model/publisher-magazine.model';

describe('Component Tests', () => {
  describe('PublisherMagazine Management Component', () => {
    let comp: PublisherMagazineComponent;
    let fixture: ComponentFixture<PublisherMagazineComponent>;
    let service: PublisherMagazineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [PublisherMagazineComponent],
      })
        .overrideTemplate(PublisherMagazineComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PublisherMagazineComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PublisherMagazineService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PublisherMagazine(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.publishers && comp.publishers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
