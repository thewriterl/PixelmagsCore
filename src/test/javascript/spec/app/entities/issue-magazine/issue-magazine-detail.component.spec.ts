import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { IssueMagazineDetailComponent } from 'app/entities/issue-magazine/issue-magazine-detail.component';
import { IssueMagazine } from 'app/shared/model/issue-magazine.model';

describe('Component Tests', () => {
  describe('IssueMagazine Management Detail Component', () => {
    let comp: IssueMagazineDetailComponent;
    let fixture: ComponentFixture<IssueMagazineDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ issue: new IssueMagazine(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [IssueMagazineDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(IssueMagazineDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(IssueMagazineDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load issue on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.issue).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
