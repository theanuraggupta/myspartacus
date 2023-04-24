/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Address, Country } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { OpfCheckoutBillingAddressFormService } from './opf-checkout-billing-address-form.service';

@Component({
  selector: 'cx-opf-checkout-billing-address-form',
  templateUrl: './opf-checkout-billing-address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCheckoutBillingAddressFormComponent implements OnInit {
  iconTypes = ICON_TYPE;

  deliveryAddress$ = this.opfCheckoutBillingAddressFormService.deliveryAddress$;
  billingAddress$ = this.opfCheckoutBillingAddressFormService.billingAddress$;
  isLoadingAddress$ =
    this.opfCheckoutBillingAddressFormService.isLoadingAddress$;

  isEditBillingAddress = false;
  isSameAsDelivery = true;

  countries$: Observable<Country[]>;

  constructor(
    protected opfCheckoutBillingAddressFormService: OpfCheckoutBillingAddressFormService
  ) {}

  ngOnInit() {
    this.setIsSameAsDeliveryCheckboxState();

    this.countries$ = this.opfCheckoutBillingAddressFormService.getCountries();
    this.opfCheckoutBillingAddressFormService.getAddresses();
  }

  cancelAndHideForm(): void {
    this.isEditBillingAddress = false;
  }

  editCustomBillingAddress(): void {
    this.isEditBillingAddress = true;
  }

  toggleSameAsDeliveryAddress(): void {
    this.isSameAsDelivery = !this.isSameAsDelivery;

    if (!this.isSameAsDelivery) {
      this.opfCheckoutBillingAddressFormService.resetBillingAddress();
      this.isEditBillingAddress = true;
    } else {
      this.opfCheckoutBillingAddressFormService.putDeliveryAddressAsPaymentAddress();
      this.isEditBillingAddress = false;
    }
  }

  onSubmitAddress(address: Address): void {
    this.opfCheckoutBillingAddressFormService
      .setBillingAddress(address)
      .subscribe();

    this.isEditBillingAddress = false;
  }

  protected setIsSameAsDeliveryCheckboxState(): void {
    this.opfCheckoutBillingAddressFormService.billingAddress$
      .pipe(
        filter((address: Address | undefined) => !!address),
        take(1)
      )
      .subscribe(() => (this.isSameAsDelivery = false));
  }
}
