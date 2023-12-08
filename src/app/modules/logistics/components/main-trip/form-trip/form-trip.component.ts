import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppTranslate } from 'src/core/constant/translation';
import { MainTripService } from '../../../services/main-trip.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/core/services/dialog.service';
import { TransactionDialog } from 'src/app/modules/accounting/shared/dialogs/transaction/transaction.dialog';

@Component({
  selector: 'app-form-trip',
  templateUrl: './form-trip.component.html',
  styleUrls: ['./form-trip.component.scss'],
})
export class FormTripComponent implements OnInit {
  accessTranslation = AppTranslate.MainTrip;
  id: string = '';
  tripForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mainTripService: MainTripService,
    private fb: FormBuilder,
    private dialogService: DialogService
  ) {
    this.tripForm = fb.group({
      supplier_id: fb.control('', [Validators.required]),
      transportation_cost_trans_id: fb.control(0),
      uploading_cost_trans_id: fb.control(0),
      downloading_cost_trans_id: fb.control(0),
      driver_fullname: fb.control(''),
      driver_mobile: fb.control(''),
      departure_date: fb.control(null, [Validators.required]),
      arrival_date: fb.control(null, [Validators.required]),
      vehicle_plate_no: fb.control(''),
      is_fulfilled: fb.control(false),
      notes: fb.control(''),
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      let id = data.get('id');
      this.id = id || '';
      if (id) {
        this.mainTripService.getTrip(id).subscribe((data) => {
          this.tripForm.patchValue({
            ...data,
            supplier_id: data.supplier_id?.toString(),
          });
        });
      }
    });
  }
  get account() {
    return this.tripForm.get('supplier_id');
  }
  transaction(name: string) {
    this.dialogService
      .openDialog(TransactionDialog, {
        data: {
          id: this.tripForm.get(name)?.value,
        },
        size: 'l',
      })
      .subscribe((data) => {
        if (data) {
          this.tripForm.get(name)?.patchValue(data);
        }
      });
  }
  save() {
    if (this.tripForm.invalid) return;
    if (!this.id) {
      this.mainTripService.addTrip(this.tripForm.value).subscribe((data) => {
        this.cancel(data.msg);
      });
    } else {
      this.mainTripService
        .updateTrip({ ...this.tripForm.value, id: this.id })
        .subscribe((data: any) => {
          this.cancel();
        });
    }
  }
  cancel(id?: string) {
    if (!this.id) {
      if (id)
        this.router.navigate([`../${id}/edit`], { relativeTo: this.route });
      else {
        this.router.navigate([`../`], { relativeTo: this.route });
      }
    } else this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
