/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CartModification } from '@spartacus/cart/base/root';
import { PointOfService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PickupLocationAdapter } from './pickup-location.adapter';

/**
 * Connector for getting store details.
 */
@Injectable({ providedIn: 'root' })
export class PickupLocationConnector {
  constructor(protected adapter: PickupLocationAdapter) {
    // Intentional empty constructor
  }

  /**
   * Get the store details by store name.
   * @param storeName The store name to get details for
   */
  getStoreDetails(storeName: string): Observable<PointOfService> {
    return this.adapter.getStoreDetails(storeName);
  }

  setPickupOptionToDelivery(
    cartId: string,
    entryNumber: number,
    userId: string,
    productCode: string,
    quantity: number
  ): Observable<CartModification> {
    return this.adapter.setPickupOptionToDelivery(
      cartId,
      entryNumber,
      userId,
      productCode,
      quantity
    );
  }

  setPickupOptionToPickupInStore(
    cartId: string,
    entryNumber: number,
    userId: string,
    name: string,
    quantity: number
  ): Observable<CartModification> {
    return this.adapter.setPickupOptionToPickupInStore(
      cartId,
      entryNumber,
      userId,
      name,
      quantity
    );
  }
}