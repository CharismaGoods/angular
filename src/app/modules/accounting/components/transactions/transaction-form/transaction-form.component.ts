import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreComponent } from 'src/core/components/core.component';
import { AppTranslate } from 'src/core/constant/translation';
import { Currency } from 'src/core/interfaces/currency.interface';
import { DatePipe } from '@angular/common';
import { TransactionService } from '../../../services/transaction.service';
@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  providers: [DatePipe],
})
export class TransactionFormComponent extends CoreComponent implements OnInit {
  accessTranslation = AppTranslate.Transactions;
  activeRouter: ActivatedRoute = inject(ActivatedRoute);
  transactionForm!: FormGroup;
  selectedCurrency?: Currency;
  entries: any[] = [];
  accounts = [];
  id?: number;
  fb: FormBuilder = inject(FormBuilder);
  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {
    super();

    this.transactionForm = this.fb.group({
      id: this.fb.control(null),
      date: this.fb.control('', []),
      currency_id: this.fb.control(null, []),
      conversion_factor: this.fb.control({ value: null, disabled: true }),
      description: this.fb.control(null, []),
      details: this.fb.group({}),
    });
  }
  ngOnInit(): void {
    this.coreService.getAllAccounts().subscribe(() => {});
    this.coreService.getAllCurrencies().subscribe(() => {});
    this.activeRouter.params.subscribe((param) => {
      this.id = param['id'];
      if (this.id) {
        this.transactionForm.get('date')?.disable();
        this.transactionForm.get('currency_id')?.disable();
        this.transactionForm.get('conversion_factor')?.disable();
        this.transactionService.getTransaction(this.id).subscribe((data) => {
          this.transactionForm.patchValue(data);
          this.selectedCurrency = data.currency_id;
          this.entries = data.entries;
        });
      }
    });
    //this.coreService.getAllCurrencies();
  }
  catchCurrency(e: any) {
    this.selectedCurrency = this.coreService.currencies?.find((currency) => {
      return e.value == currency.id;
    });

    if (!this.selectedCurrency?.is_main)
      this.transactionForm.get('conversion_factor')?.enable({ onlySelf: true });
    this.transactionForm
      .get('conversion_factor')
      ?.setValue(this.selectedCurrency?.rateToMainCurrency);
  }

  save() {
    let data = this.transactionForm?.getRawValue();
    data['entries'] = [];
    for (let entry in data.details) {
      data['entries'].push({
        ...data.details[entry],
      });
    }
    data.date = this.datePipe.transform(data.date, 'yyyy-MM-dd');
    data.currency_id = data.currency_id;
    delete data['details'];
    this.transactionService.createTransaction(data).subscribe((data) => {
      this.cancel();
    });
  }
  cancel() {
    this.router.navigate(['/accounting/transactions']);
  }
}
