import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { MagazineMagazineComponent } from 'app/entities/magazine-magazine/magazine-magazine.component';
import { MagazineMagazineService } from 'app/entities/magazine-magazine/magazine-magazine.service';
import { MagazineMagazine } from 'app/shared/model/magazine-magazine.model';

describe('Component Tests', () => {
  describe('MagazineMagazine Management Component', () => {
    let comp: MagazineMagazineComponent;
    let fixture: ComponentFixture<MagazineMagazineComponent>;
    let service: MagazineMagazineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [MagazineMagazineComponent],
      })
        .overrideTemplate(MagazineMagazineComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MagazineMagazineComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MagazineMagazineService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MagazineMagazine(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.magazines && comp.magazines[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
