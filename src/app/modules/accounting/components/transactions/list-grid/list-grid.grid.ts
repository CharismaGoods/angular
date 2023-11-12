import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgTemplateComponent } from 'src/core/components/ag-grid-template/ag-grid-template.component';
import { AppTranslate } from 'src/core/constant/translation';
import { Transaction } from '../../../interfaces/transaction.interface';
import { TransactionActionsCell } from './cell-renderers/actions.cell';
import { BalanceCell } from '../../../shared/cell-renderers/balance.cell';

@Component({
  selector: 'transaction-table-grid',
  template: '',
  providers: [],
})
export class TransactionGrid extends AgTemplateComponent {
  public rowData!: [];
  public columnDefs: ColDef[] = [];
  accessTranslation = AppTranslate.Transactions;
  constructor() {
    super();
    this.columnDefs = [
      {
        field: 'date',
        headerName: this.accessTranslation + '.date',
      },
      {
        field: 'value',
        headerName: this.accessTranslation + '.value',
        cellRenderer: BalanceCell,
      },
      // {
      //   field: 'currency_id',
      //   headerName: this.accessTranslation + '.currency',
      // },
      {
        field: 'value_eur',
        headerName: this.accessTranslation + '.value-eur',
      },
      {
        field: 'created_by',
        headerName: this.accessTranslation + '.user',
      },
      {
        field: 'description',
        headerName: this.accessTranslation + '.description',
      },
      {
        cellRenderer: TransactionActionsCell,
        width: 80,
        minWidth: 80,
        flex: 0.2,
        resizable: false,
      },
    ];
    this.gridOptions = {
      ...this.gridOptions,
      onRowClicked: (e) => {
        const row = this.gridOptions.api?.getSelectedRows()[0];
        // this.router.navigate([`edit/${row.id}`], {
        //   relativeTo: this.activeRoute,
        // });
      },
    };
  }

  setRowData(data: Transaction[]) {
    this.gridOptions.api?.setRowData(data);
  }
}
