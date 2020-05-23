import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { IssueMagazineService } from 'app/entities/issue-magazine/issue-magazine.service';
import { IIssueMagazine, IssueMagazine } from 'app/shared/model/issue-magazine.model';

describe('Service Tests', () => {
  describe('IssueMagazine Service', () => {
    let injector: TestBed;
    let service: IssueMagazineService;
    let httpMock: HttpTestingController;
    let elemDefault: IIssueMagazine;
    let expectedResult: IIssueMagazine | IIssueMagazine[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(IssueMagazineService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new IssueMagazine(0, 'AAAAAAA', 'AAAAAAA', currentDate, 'AAAAAAA', 0, 'AAAAAAA', 'image/png', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataLancamento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a IssueMagazine', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataLancamento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataLancamento: currentDate,
          },
          returnedFromService
        );

        service.create(new IssueMagazine()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a IssueMagazine', () => {
        const returnedFromService = Object.assign(
          {
            edicao: 'BBBBBB',
            manchete: 'BBBBBB',
            dataLancamento: currentDate.format(DATE_FORMAT),
            descricao: 'BBBBBB',
            numeroPaginas: 1,
            url: 'BBBBBB',
            coverThumbnail: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataLancamento: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of IssueMagazine', () => {
        const returnedFromService = Object.assign(
          {
            edicao: 'BBBBBB',
            manchete: 'BBBBBB',
            dataLancamento: currentDate.format(DATE_FORMAT),
            descricao: 'BBBBBB',
            numeroPaginas: 1,
            url: 'BBBBBB',
            coverThumbnail: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataLancamento: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a IssueMagazine', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
