import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import type { i18n } from 'i18next';
import { WindowRef } from '../../../window/window-ref';
import { I18nConfig } from '../../config/i18n-config';
import { I18NEXT_INSTANCE } from '../i18next-instance';
import { I18nextHttpBackendService } from './i18next-http-backend.service';

class MockWindowRef implements Partial<WindowRef> {
  isBrowser() {
    return true;
  }

  get location() {
    return {};
  }
}

fdescribe('I18nextHttpBackendService', () => {
  /*

  // SPIKE TODO: possibly extract to separate Injectable class

    when config 'i18n.backend.loadPath' is set
      should use angular http client for loading translations from backend
      should use the loadPath for loading translations from backend

      forwards success response to i18next callback
      forwards failure response to i18next callback

  // when i18n.backend.loadPath is provided
  //   should set the i18next http client

  */

  let initializer: I18nextHttpBackendService;
  let i18next: i18n; // i18next instance
  let config: I18nConfig;
  let windowRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: I18nConfig, useValue: { i18n: {} } },
        {
          provide: WindowRef,
          useClass: MockWindowRef,
        },
      ],
      imports: [
        HttpClientTestingModule, // SPIKE TODO: remove, when extracting I18nextHttpClient
      ],
    });

    initializer = TestBed.inject(I18nextHttpBackendService);
    i18next = TestBed.inject(I18NEXT_INSTANCE);
    config = TestBed.inject(I18nConfig);
    windowRef = TestBed.inject(WindowRef);
  });

  describe('initialize', () => {
    it('should set config backend.reloadInterval to false', () => {
      config.i18n = { backend: { loadPath: 'test/path' } };
      spyOn(i18next, 'init');

      const result = initializer.initialize();

      expect(result.backend?.reloadInterval).toBe(false);
    });

    // SPIKE TODO LATER
    it('should configure Angular HttpClient as a http client of i18next', () => {
      // ...
      throw new Error('not implemented');
    });

    describe('i18nextGetHttpClient should return a http client that', () => {
      let httpMock: HttpTestingController;
      let httpClient: HttpClient;
      let req: TestRequest;
      let testCallback: RequestCallback;

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
        });

        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);

        const func = i18nextGetHttpClient(httpClient);
        testCallback = jasmine.createSpy('testCallback');
        func({}, testUrl, {}, testCallback);
        req = httpMock.expectOne({ url: testUrl, method: 'GET' });
      });

      afterEach(() => {
        httpMock.verify();
      });

      it('requests for responseType text', () => {
        expect(req.request.responseType).toBe('text');
      });

      it('forwards success response to i18next callback', () => {
        req.flush('testResponse');

        expect(testCallback).toHaveBeenCalledWith(null, {
          status: 200,
          data: 'testResponse',
        });
      });

      it('forwards failure response to i18next callback', () => {
        const error = 'test error message';
        const statusText = 'Not Found';
        const status = 404;
        const expectedHttpErrorResponse = new HttpErrorResponse({
          status,
          error,
          statusText,
          url: testUrl,
        });

        req.flush(error, {
          status,
          statusText,
        });
        expect(testCallback).toHaveBeenCalledWith(expectedHttpErrorResponse, {
          status,
          // a workaround for https://github.com/i18next/i18next-http-backend/issues/82
          data: null as any,
        });
      });
    });

    describe('when config i18n.backend.loadPath is set', () => {
      describe('in non-server platform', () => {
        beforeEach(() => {
          spyOn(windowRef, 'isBrowser').and.returnValue(true);
        });

        describe('with relative path starting with "./"', () => {
          const path = './path';

          it('should return the original path', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize();
            expect(result.backend?.loadPath).toBe(path);
          });
        });

        describe('with relative path starting with "/"', () => {
          const path = '/path';

          it('should return the original path', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize();
            expect(result.backend?.loadPath).toBe(path);
          });
        });

        describe('with relative path starting with ""', () => {
          const path = 'path';

          it('should return the original path', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize();
            expect(result.backend?.loadPath).toBe(path);
          });
        });

        describe('with absolute path starting with "http://"', () => {
          const path = 'http://path';

          it('should return the original path', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize();
            expect(result.backend?.loadPath).toBe(path);
          });
        });

        describe('with absolute path starting with "https://"', () => {
          const path = 'https://path';

          it('should return the original path', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize();
            expect(result.backend?.loadPath).toBe(path);
          });
        });
      });

      describe('in server platform', () => {
        const serverRequestOrigin = 'http://server.com';

        beforeEach(() => {
          spyOn(windowRef, 'isBrowser').and.returnValue(false);
          spyOnProperty(windowRef, 'location', 'get').and.returnValue({
            origin: serverRequestOrigin,
          });
        });

        describe('with relative path starting with "./"', () => {
          const path = './path';

          it('should return the original path prepended with server request origin', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize();
            expect(result.backend?.loadPath).toBe('http://server.com/path');
          });
        });

        describe('with relative path starting with "/"', () => {
          const path = '/path';

          it('should return the original path prepended with server request origin', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize();
            expect(result.backend?.loadPath).toBe('http://server.com/path');
          });
        });

        describe('with relative path starting with ""', () => {
          const path = 'path';

          it('should return the original path prepended with server request origin', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize();
            expect(result.backend?.loadPath).toBe('http://server.com/path');
          });
        });

        describe('with absolute path starting with "http://"', () => {
          const path = 'http://path';

          it('should return the original path', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize();
            expect(result.backend?.loadPath).toBe(path);
          });
        });

        describe('with absolute path starting with "https://"', () => {
          const path = 'https://path';

          it('should return the original path', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize();
            expect(result.backend?.loadPath).toBe(path);
          });
        });
      });
    });
  });
});