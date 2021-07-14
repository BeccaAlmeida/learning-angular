import { SwitchMergeComponent } from './../components/switch-merge/switch-merge.component';
import { UnsubscribeComponent } from './../components/unsubscribe/unsubscribe.component';
import { DragAndDropComponent } from './../components/drag-and-drop/drag-and-drop.component';
import { ErrorHandlingComponent } from './../components/error-handling/error-handling.component';
import { AsyncComponent } from './../components/async/async.component';
import { OperatorsComponent } from './../components/operators/operators.component';
import { BasicCreationComponent } from './../components/basic-creation/basic-creation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: '../components/basic-creation',
    component: BasicCreationComponent,
  },
  {
    path: '../components/operators',
    component: OperatorsComponent,
  },
  {
    path: '../components/async',
    component: AsyncComponent,
  },
  {
    path: '../components/error-handling',
    component: ErrorHandlingComponent,
  },
  {
    path: '../components/drag-and-drop',
    component: DragAndDropComponent,
  },
  {
    path: '../components/unsubscribe',
    component: UnsubscribeComponent,
  },
  {
    path: '../components/switch-merge',
    component: SwitchMergeComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
