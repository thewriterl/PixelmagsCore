import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { PublisherMagazineDetailComponent } from 'app/entities/publisher-magazine/publisher-magazine-detail.component';
import { PublisherMagazine } from 'app/shared/model/publisher-magazine.model';

describe('Component Tests', () => {
  describe('PublisherMagazine Management Detail Component', () => {
    let comp: PublisherMagazineDetailComponent;
    let fixture: ComponentFixture<PublisherMagazineDetailComponent>;
    const route = ({ data: of({ publisher: new PublisherMagazine(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [PublisherMagazineDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PublisherMagazineDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PublisherMagazineDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load publisher on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.publisher).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
