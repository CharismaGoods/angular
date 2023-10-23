import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './components/application.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { SharedModule } from 'src/core/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AccountingModule } from '../accounting/accounting.module';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/application/', '.json');
}

@NgModule({
  declarations: [ApplicationComponent, SidebarComponent, BreadCrumbComponent],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    SharedModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
     AccountingModule,
  ],
})
export class ApplicationModule {}
