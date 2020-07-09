import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Screen1AddFunctionComponent } from './screen1-add-function/screen1-add-function.component';
import { Screen2ReadFunctionComponent } from './screen2-read-function/screen2-read-function.component';
import { Screen3SeeFunctionComponent } from './screen3-see-function/screen3-see-function.component';
import { ScreenLoadingComponent } from './screen-loading/screen-loading.component';
import { MotherscreenComponent } from './motherscreen/motherscreen.component';
import { Screen1OvenFunctionComponent } from './screen1-oven-function/screen1-oven-function.component';
import { Screen1AcFunctionComponent } from './screen1-ac-function/screen1-ac-function.component';
import { Screen1MergeFunctionComponent } from './screen1-merge-function/screen1-merge-function.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Screen1WasherFunctionComponent } from './screen1-washer-function/screen1-washer-function.component';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { DatabasePopupComponent } from './screen3-see-function/databasepopup/databasepopup.component';
import { EvenOddPipe } from './pairs.pipe';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CountSnackBarComponent } from './count-snack-bar/count-snack-bar.component';
import { MatSliderModule } from '@angular/material/slider';
import { Page1Component } from './page1/page1.component';

@NgModule({
  declarations: [
    AppComponent,
    Screen1AddFunctionComponent,
    Screen2ReadFunctionComponent,
    Screen3SeeFunctionComponent,
    ScreenLoadingComponent,
    MotherscreenComponent,
    Screen1OvenFunctionComponent,
    Screen1AcFunctionComponent,
    Screen1MergeFunctionComponent,
    Screen1WasherFunctionComponent,
    DatabasePopupComponent,
    EvenOddPipe,
    CountSnackBarComponent,
    Page1Component
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonToggleModule,
    CdkScrollableModule,
    ScrollingModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    MatSnackBarModule,
    MatSliderModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DatabasePopupComponent]
})
export class AppModule { }
