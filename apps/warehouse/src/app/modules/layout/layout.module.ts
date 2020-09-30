import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './containers/layout/layout.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, RouterModule],
})
export class LayoutModule {}
