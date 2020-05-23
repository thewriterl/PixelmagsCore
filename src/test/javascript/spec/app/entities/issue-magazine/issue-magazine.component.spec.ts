import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { IssueMagazineComponent } from 'app/entities/issue-magazine/issue-magazine.component';
import { IssueMagazineService } from 'app/entities/issue-magazine/issue-magazine.service';
import { IssueMagazine } from 'app/shared/model/issue-magazine.model';

describe('Component Tests', () => {
  describe('IssueMagazine Management Component', () => {
    let comp: IssueMagazineComponent;
    let fixture: ComponentFixture<IssueMagazineComponent>;
    let service: IssueMagazineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [IssueMagazineComponent],
      })
        .overrideTemplate(IssueMagazineComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IssueMagazineComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IssueMagazineService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new IssueMagazine(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.issues && comp.issues[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
