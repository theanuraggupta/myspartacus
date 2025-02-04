/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const productVariantsTranslations: TranslationResources = {
  en,
};

// expose all translation chunk mapping for variants sub features
export const productVariantsTranslationChunksConfig: TranslationChunksConfig = {
  productVariants: ['productVariants'],
};
