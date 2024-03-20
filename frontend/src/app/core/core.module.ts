import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { LoadingPageComponent } from './pages/loading-page/loading-page.component';



@NgModule({
  declarations: [
    LoadingPageComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingPageComponent,
  ]
})
export class CoreModule {
  
  constructor(@Optional() @SkipSelf() parentModule: CoreModule, library: FaIconLibrary) {
    if (parentModule) throw new Error(`${parentModule} has already been loaded. Import Core module from the AppModule only!`);
    library.addIconPacks(fas);
  }
}
