import { SwitchMergeComponent } from './../components/switch-merge/switch-merge.component';
import { UnsubscribeComponent } from './../components/unsubscribe/unsubscribe.component';
import { DragAndDropComponent } from './../components/drag-and-drop/drag-and-drop.component';
import { ErrorHandlingComponent } from './../components/error-handling/error-handling.component';
import { AsyncComponent } from './../components/async/async.component';
import { OperatorsComponent } from './../components/operators/operators.component';
import { BasicCreationComponent } from './../components/basic-creation/basic-creation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,

  ],
  declarations: [
    HomePage,
    BasicCreationComponent,
    OperatorsComponent,
    AsyncComponent,
    ErrorHandlingComponent,
    DragAndDropComponent,
    UnsubscribeComponent,
    SwitchMergeComponent
  ]
})
export class HomePageModule {}
