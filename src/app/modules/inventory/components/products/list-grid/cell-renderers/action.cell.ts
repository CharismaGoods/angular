import { Component, INJECTOR, Inject, Injector, inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'src/core/services/dialog.service';
import { DeleteEntityComponent } from 'src/core/dialogs/delete-entity/delete-entity.component';
import { AppTranslate } from 'src/core/constant/translation';
import { ProductService } from 'src/app/modules/inventory/services/product.service';

@Component({
  selector: 'transactions-list-actions',
  template: `
    <div class="d-flex-ng">
      <button mat-icon-button [matMenuTriggerFor]="menu" class="more-btn">
        <mat-icon>more_vert</mat-icon>
      </button>
      <mat-menu #menu="matMenu" class="more-actions-menu">
        <button
          class="more-btn"
          color="primary"
          mat-menu-item
          [routerLink]="[params.data.id]"
          [relativeTo]="activeRoute"
        >
          <mat-icon color="primary">remove_red_eye</mat-icon>
          <div>{{ 'view' | translate }}</div>
        </button>
        <button
          class="more-btn"
          color="primary"
          mat-menu-item
          [routerLink]="[params.data.id + '/edit']"
          [relativeTo]="activeRoute"
        >
          <mat-icon color="accent">edit</mat-icon>
          <div>{{ 'edit' | translate }}</div>
        </button>
        <button
          class="more-btn"
          color="primary"
          mat-menu-item
          (click)="deleteProduct()"
        >
          <mat-icon color="warn">delete</mat-icon>
          <div>{{ 'delete' | translate }}</div>
        </button>
      </mat-menu>
    </div>
  `,
  styles: [
    `
      ::ng-deep {
        [dir='rtl'] .mat-mdc-menu-item {
          flex-direction: row-reverse !important;
        }
        .mat-mdc-menu-item {
          min-height: 40px !important;
          font-size: 14px !important;
          border-bottom: 1px dashed var(--light-active-accent-color) !important;
          &:last-child {
            border-bottom: none !important;
          }
        }
        .mat-mdc-menu-item.mdc-list-item {
          .mat-icon path {
            fill: var(--primary-color) !important;
          }
        }
        .mat-mdc-menu-content {
          padding: 0 !important;
        }
        .more-actions-menu {
          width: 100% !important;
        }
      }
      .more-btn {
        cursor: pointer;
      }
    `,
  ],
})
export class ProductActionsCell implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  constructor(
    @Inject(INJECTOR) injector: Injector,
    private _router: Router,
    private translateService: TranslateService,
    private productService: ProductService,
    private dialog: DialogService
  ) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }
  deleteProduct() {
    this.dialog
      .openDialog(DeleteEntityComponent, {
        size: 'ms',
        data: {
          title: this.translateService.instant(
            AppTranslate.Products + '.delete-product-title'
          ),
          message: this.translateService.instant(
            AppTranslate.Products + '.delete-product-message',
            { name: this.params.data.name }
          ),
        },
      })
      .subscribe((res) => {
        if (res) {
          this.productService
            .deleteProduct(this.params.data.id)
            .subscribe((data) => {
              this.params.api.applyTransaction({
                remove: [this.params.data],
              });
            });
        }
      });
  }
}
