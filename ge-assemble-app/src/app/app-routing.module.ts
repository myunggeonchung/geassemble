import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Screen1AddFunctionComponent } from './screen1-add-function/screen1-add-function.component';
import { Screen2ReadFunctionComponent } from './screen2-read-function/screen2-read-function.component';
import { Screen3SeeFunctionComponent } from './screen3-see-function/screen3-see-function.component';
import { MotherscreenComponent } from './motherscreen/motherscreen.component';
import { Screen1OvenFunctionComponent } from './screen1-oven-function/screen1-oven-function.component';
import { Screen1AcFunctionComponent } from './screen1-ac-function/screen1-ac-function.component';
import { Screen1MergeFunctionComponent } from './screen1-merge-function/screen1-merge-function.component';
import { Screen1WasherFunctionComponent } from './screen1-washer-function/screen1-washer-function.component';
import { ScreenLoadingComponent } from './screen-loading/screen-loading.component'
const routes: Routes = [
  {
    path:'', component: ScreenLoadingComponent
  },
  
  { path: 'screen-loading-component', component: ScreenLoadingComponent,
    children:[
      {
        path:'screen-mother', component:MotherscreenComponent
      }
    ]
  },
  { path: 'screen-mother', component: MotherscreenComponent,
    children:[
      {
        path:'screen1-addfunction-component', component: Screen1AddFunctionComponent, pathMatch: 'full'
      },
      {
        path:'screen2-readfunction-component', component: Screen2ReadFunctionComponent,  pathMatch: 'full'
      },
      {
        path:'screen3-seefunction-component', component: Screen3SeeFunctionComponent,  pathMatch: 'full'
      }
    ]
  },
  { path: 'screen1-addfunction-component', component: Screen1AddFunctionComponent,
    children:[
      {
        path:'screen1-ovenfunction-component', component: Screen1OvenFunctionComponent
      },
      {
        path:'screen1-acfunction-component', component: Screen1AcFunctionComponent
      },
      {
        path:'screen1-washerfunction-component', component: Screen1WasherFunctionComponent
      },
      {
        path:'screen1-mergefunction-component', component: Screen1MergeFunctionComponent
      }
    ]
  },
  { path: 'screen2-readfunction-component', component: Screen2ReadFunctionComponent },
  { path: 'screen3-seefunction-component', component: Screen3SeeFunctionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
