/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Renderer2 } from '@angular/core';
import { ContentSlotData } from '../model/content-slot-data.model';

@Injectable()
export abstract class SlotDecorator {
  /**
   * Add attributes to CMS Slot element dynamically
   * @param element: CMS slot element
   * @param renderer
   * @param slot: CMS slot data
   */
  abstract decorate(
    element: Element,
    renderer: Renderer2,
    slot?: ContentSlotData
  ): void;
}
