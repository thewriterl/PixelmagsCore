import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { MagazineMagazineDetailComponent } from 'app/entities/magazine-magazine/magazine-magazine-detail.component';
import { MagazineMagazine } from 'app/shared/model/magazine-magazine.model';

describe('Component Tests', () => {
  describe('MagazineMagazine Management Detail Component', () => {
    let comp: MagazineMagazineDetailComponent;
    let fixture: ComponentFixture<MagazineMagazineDetailComponent>;
    const route = ({ data: of({ magazine: new MagazineMagazine(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [MagazineMagazineDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MagazineMagazineDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MagazineMagazineDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load magazine on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.magazine).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
