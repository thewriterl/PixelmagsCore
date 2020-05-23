import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PixelmagsCoreTestModule } from '../../../test.module';
import { LogMagazineDetailComponent } from 'app/entities/log-magazine/log-magazine-detail.component';
import { LogMagazine } from 'app/shared/model/log-magazine.model';

describe('Component Tests', () => {
  describe('LogMagazine Management Detail Component', () => {
    let comp: LogMagazineDetailComponent;
    let fixture: ComponentFixture<LogMagazineDetailComponent>;
    const route = ({ data: of({ log: new LogMagazine(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsCoreTestModule],
        declarations: [LogMagazineDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LogMagazineDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LogMagazineDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load log on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.log).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
