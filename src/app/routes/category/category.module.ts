import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@modules/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';
import { SortingComponent } from './sorting/sorting.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
  },
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [CategoryComponent, SortingComponent],
})
export class CategoryModule {}
