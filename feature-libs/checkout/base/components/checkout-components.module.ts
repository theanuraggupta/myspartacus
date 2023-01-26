/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { PAGE_LAYOUT_HANDLER } from '@spartacus/storefront';
import { CheckoutDeliveryAddressModule } from './checkout-delivery-address/checkout-delivery-address.module';
import { CheckoutDeliveryModeModule } from './checkout-delivery-mode/checkout-delivery-mode.module';
import { CheckoutLoginModule } from './checkout-login/checkout-login.module';
import { CheckoutOrchestratorModule } from './checkout-orchestrator/checkout-orchestrator.module';
import { CheckoutOrderSummaryModule } from './checkout-order-summary/checkout-order-summary.module';
import { CheckoutPaymentMethodModule } from './checkout-payment-method/checkout-payment-method.module';
import { CheckoutPlaceOrderModule } from './checkout-place-order/checkout-place-order.module';
import { CheckoutProgressMobileBottomModule } from './checkout-progress/checkout-progress-mobile-bottom/checkout-progress-mobile-bottom.module';
import { CheckoutProgressMobileTopModule } from './checkout-progress/checkout-progress-mobile-top/checkout-progress-mobile-top.module';
import { CheckoutProgressModule } from './checkout-progress/checkout-progress.module';
import { CheckoutReviewSubmitModule } from './checkout-review-submit/checkout-review-submit.module';
import { CheckoutReviewPageLayoutHandler } from './checkout-review/checkout-review-page-layout-handler';
import { CheckoutReviewShippingModule } from './checkout-review/checkout-review-shipping/checkout-review-shipping.module';

@NgModule({
  imports: [
    CheckoutOrchestratorModule,
    CheckoutOrderSummaryModule,
    CheckoutProgressModule,
    CheckoutProgressMobileTopModule,
    CheckoutProgressMobileBottomModule,
    CheckoutDeliveryModeModule,
    CheckoutPaymentMethodModule,
    CheckoutPlaceOrderModule,
    CheckoutReviewSubmitModule,
    CheckoutReviewShippingModule,
    CheckoutDeliveryAddressModule,
    CheckoutLoginModule,
  ],
  providers: [
    {
      provide: PAGE_LAYOUT_HANDLER,
      useExisting: CheckoutReviewPageLayoutHandler,
      multi: true,
    },
  ],
})
export class CheckoutComponentsModule {}
