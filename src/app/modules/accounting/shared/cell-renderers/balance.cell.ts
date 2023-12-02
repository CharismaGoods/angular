import {
  Component,
  INJECTOR,
  Inject,
  Injector,
  Renderer2,
  inject,
} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'balance-cell',
  template: `
    <div class="flex-d">
      <span>
        {{
          (params.data?.balance != null ? params.data?.balance : params.value)
            | number : '3.1-3'
        }}
      </span>

      <span> {{ params.data?.currency_id }}</span>
    </div>
  `,
  styles: [
    `
      .flex-d {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export class BalanceCell implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  pinned: boolean = false;
  formGroup?: FormGroup;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  accountControl: any;
  parent: any;
  constructor(
    @Inject(INJECTOR) injector: Injector,
    private _router: Router,
    private renderer: Renderer2
  ) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }
}
