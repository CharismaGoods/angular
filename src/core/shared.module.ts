//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, provideNgxMask, NgxMaskPipe } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { PrefixTranslatePipe } from './pipes/prefix-translate.pipe';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { TranslateComponent } from './components/translate/translate.component';
import { HighlightPipe } from './pipes/highlight.pipe';
import { LoaderDirective } from './directives/loader.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { NotifierComponent } from './components/notifier/notifier.component';
import { MultiTranslateHttpLoader } from './http/translate.http';
import { DeleteEntityComponent } from './dialogs/delete-entity/delete-entity.component';
import { InputFormFieldComponent } from './components/custom-form-field/input-form-field/input-form-field.component';
import { DateFormFieldComponent } from './components/custom-form-field/date-form-field/date-form-field.component';
import { SelectFormFieldComponent } from './components/custom-form-field/select-form-field/select-form-field.component';
import { SearchAccountsComponent } from 'src/app/modules/accounting/shared/search-accounts/search-accounts.component';
import { ConfirmEntityComponent } from './dialogs/confirm-entity/confirm-entity.component';

function playerFactory() {
  return player;
}
@NgModule({
  declarations: [
    // Components
    PrefixTranslatePipe,
    //TranslateComponent,
    HighlightPipe,
    //directives
    LoaderDirective,
    LoaderComponent,
    NotifierComponent,
    DeleteEntityComponent,
    InputFormFieldComponent,
    DateFormFieldComponent,
    SelectFormFieldComponent,
    ConfirmEntityComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient): MultiTranslateHttpLoader => {
          return new MultiTranslateHttpLoader(http, {
            resources: [],
          });
        },
        deps: [HttpClient],
      },
      isolate: true,
    }),
    //   TranslateModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    //   TranslateModule,
    HttpClientModule,
    ReactiveFormsModule,
    LottieModule,
    PrefixTranslatePipe,
    HighlightPipe,
    // TranslateComponent,
    NotifierComponent,
    InputFormFieldComponent,
    DateFormFieldComponent,
    SelectFormFieldComponent,
    //directives
    LoaderDirective,
    LoaderComponent,
  ],
  providers: [provideNgxMask()],
})
export class SharedModule {}
