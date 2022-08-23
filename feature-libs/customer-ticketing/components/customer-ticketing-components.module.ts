import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideDefaultConfig } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { CustomerTicketingCloseModule } from './customer-ticketing-close';
import { CustomerTicketingDetailsModule } from './customer-ticketing-details';
import { CustomerTicketingReopenModule } from './customer-ticketing-reopen';
import { CustomerTicketingListModule } from './customer-ticketing-list';
import { defaultCustomerTicketingFormLayoutConfig } from './customer-ticketing-dialog';
import { CustomerTicketingDialogModule } from './customer-ticketing-dialog/customer-ticketing-dialog.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormErrorsModule,
    CustomerTicketingDetailsModule,
    CustomerTicketingCloseModule,
    CustomerTicketingReopenModule,
    CustomerTicketingListModule,
    CustomerTicketingDialogModule,
  ],
  declarations: [],
  exports: [],
  providers: [provideDefaultConfig(defaultCustomerTicketingFormLayoutConfig)],
})
export class CustomerTicketingComponentsModule {}
