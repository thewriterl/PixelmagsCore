import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDeviceMagazine, DeviceMagazine } from 'app/shared/model/device-magazine.model';
import { DeviceMagazineService } from './device-magazine.service';
import { ICustomerMagazine } from 'app/shared/model/customer-magazine.model';
import { CustomerMagazineService } from 'app/entities/customer-magazine/customer-magazine.service';

@Component({
  selector: 'jhi-device-magazine-update',
  templateUrl: './device-magazine-update.component.html',
})
export class DeviceMagazineUpdateComponent implements OnInit {
  isSaving = false;
  customers: ICustomerMagazine[] = [];

  editForm = this.fb.group({
    id: [],
    fabricante: [],
    modelo: [],
    os: [],
    customerId: [],
  });

  constructor(
    protected deviceService: DeviceMagazineService,
    protected customerService: CustomerMagazineService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ device }) => {
      this.updateForm(device);

      this.customerService.query().subscribe((res: HttpResponse<ICustomerMagazine[]>) => (this.customers = res.body || []));
    });
  }

  updateForm(device: IDeviceMagazine): void {
    this.editForm.patchValue({
      id: device.id,
      fabricante: device.fabricante,
      modelo: device.modelo,
      os: device.os,
      customerId: device.customerId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const device = this.createFromForm();
    if (device.id !== undefined) {
      this.subscribeToSaveResponse(this.deviceService.update(device));
    } else {
      this.subscribeToSaveResponse(this.deviceService.create(device));
    }
  }

  private createFromForm(): IDeviceMagazine {
    return {
      ...new DeviceMagazine(),
      id: this.editForm.get(['id'])!.value,
      fabricante: this.editForm.get(['fabricante'])!.value,
      modelo: this.editForm.get(['modelo'])!.value,
      os: this.editForm.get(['os'])!.value,
      customerId: this.editForm.get(['customerId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeviceMagazine>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ICustomerMagazine): any {
    return item.id;
  }
}
