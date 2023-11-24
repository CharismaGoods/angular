import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/core/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './components/inventory.component';
import { ProductsListComponent } from './components/products/products.component';
import { FormProductComponent } from './components/products/form-product/form-product.component';
import { ProductActionsCell } from './components/products/list-grid/cell-renderers/action.cell';
import { AgGridModule } from 'ag-grid-angular';
import { FormVariantComponent } from './components/products/form-product/form-variant/form-variant.component';
import { VariantInput } from './components/products/form-product/form-variant/cell-renderer/variant-input.cell';
import { NgxMaskDirective, provideNgxMask, NgxMaskPipe } from 'ngx-mask';
import { ApplicationModule } from '../application/application.module';
import { VariantActionsCell } from './components/products/form-product/form-variant/cell-renderer/action.cell';
import { ViewProductComponent } from './components/products/view-product/view-product.component';
import { ViewVariantComponent } from './components/products/view-product/view-variant/view-variant.component';
import { InventoryActionCell } from './components/products/view-product/view-variant/cell-renderers/action.cell';
import { LinkVariantComponent } from './dialogs/link-variant/link-variant.component';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/application/inventory/',
    '.json'
  );
}

@NgModule({
  declarations: [
    InventoryComponent,
    ProductsListComponent,
    FormProductComponent,
    ProductActionsCell,
    FormVariantComponent,
    VariantInput,
    VariantActionsCell,
    ViewProductComponent,
    ViewVariantComponent,
    InventoryActionCell,
    LinkVariantComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AgGridModule,
    ApplicationModule,
    InventoryRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
  providers: [provideNgxMask()],
})
export class InventoryModule {}
