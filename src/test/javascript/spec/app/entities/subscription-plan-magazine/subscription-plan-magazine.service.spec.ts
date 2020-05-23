import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SubscriptionPlanMagazineService } from 'app/entities/subscription-plan-magazine/subscription-plan-magazine.service';
import { ISubscriptionPlanMagazine, SubscriptionPlanMagazine } from 'app/shared/model/subscription-plan-magazine.model';
import { SubscriptionPeriod } from 'app/shared/model/enumerations/subscription-period.model';

describe('Service Tests', () => {
  describe('SubscriptionPlanMagazine Service', () => {
    let injector: TestBed;
    let service: SubscriptionPlanMagazineService;
    let httpMock: HttpTestingController;
    let elemDefault: ISubscriptionPlanMagazine;
    let expectedResult: ISubscriptionPlanMagazine | ISubscriptionPlanMagazine[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SubscriptionPlanMagazineService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new SubscriptionPlanMagazine(0, 'AAAAAAA', 0, SubscriptionPeriod.DIARIO);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a SubscriptionPlanMagazine', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new SubscriptionPlanMagazine()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a SubscriptionPlanMagazine', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            preco: 1,
            periodo: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of SubscriptionPlanMagazine', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            preco: 1,
            periodo: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a SubscriptionPlanMagazine', () => {
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
