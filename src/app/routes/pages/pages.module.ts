import { NgModule } from '@angular/core';
import { Page500Component } from './page500/page500.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@modules/shared.module';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule],
  declarations: [Page500Component, ContactComponent],
  exports: [],
})
export class PagesModule {}
