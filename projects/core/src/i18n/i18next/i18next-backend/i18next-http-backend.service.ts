/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import type { i18n, InitOptions } from 'i18next';
import i18nextHttpBackend, { BackendOptions } from 'i18next-http-backend';
import { WindowRef } from '../../../window/window-ref';
import { I18nConfig } from '../../config/i18n-config';
import { I18NEXT_INSTANCE } from '../i18next-instance';
import { I18nextBackendService } from './i18next-backend.service';
import {
  I18nextHttpBackendClient,
  I18NEXT_HTTP_BACKEND_CLIENT,
} from './i18next-http-backend-client';

/**
 * Initializes the i18next HTTP backend plugin for loading translations from the backend via HTTP.
 */
@Injectable({ providedIn: 'root' })
export class I18nextHttpBackendService implements I18nextBackendService {
  constructor(
    @Inject(I18NEXT_INSTANCE) protected i18next: i18n,
    @Inject(I18NEXT_HTTP_BACKEND_CLIENT)
    protected i18nextHttpClient: I18nextHttpBackendClient,
    protected config: I18nConfig,
    protected httpClient: HttpClient,
    protected windowRef: WindowRef
  ) {}

  /**
   * @override Initializes the i18next http backend plugin and returns the configuration for it.
   */
  initialize(): InitOptions {
    this.i18next.use(i18nextHttpBackend);
    return { backend: this.getBackendConfig() };
  }

  /**
   * Returns the configuration for the i18next http backend plugin.
   */
  protected getBackendConfig(): BackendOptions {
    const loadPath = this.getLoadPath(
      // SPIKE TODO: improve typing:
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.config.i18n!.backend!.loadPath!
    );
    const backend: BackendOptions = {
      loadPath,

      request: this.i18nextHttpClient,

      // Disable the periodical reloading. Otherwise SSR would not finish due to the pending task `setInterval()`
      // See source code of `i18next-http-backend` : https://github.com/i18next/i18next-http-backend/blob/00b7e8f67abf8372af17529b51190a7e8b17e3d8/lib/index.js#L40-L41
      reloadInterval: false,
    };
    return backend;
  }

  /**
   * Resolves the relative path to the absolute one in SSR, using the server request's origin.
   * It's needed, because Angular Universal doesn't support relative URLs in HttpClient. See Angular issues:
   * - https://github.com/angular/angular/issues/19224
   * - https://github.com/angular/universal/issues/858
   */
  protected getLoadPath(path: string): string {
    if (!this.windowRef.isBrowser() && !path.match(/^http(s)?:\/\//)) {
      if (path.startsWith('/')) {
        path = path.slice(1);
      }
      if (path.startsWith('./')) {
        path = path.slice(2);
      }
      const serverRequestOrigin = this.windowRef.location.origin;
      const result = `${serverRequestOrigin}/${path}`;
      return result;
    }
    return path;
  }
}