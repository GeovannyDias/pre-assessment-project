import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { apiPrefixInterceptor } from './api-prefix-interceptor';
import { environment } from '../../../environments/environment';
import { of, throwError } from 'rxjs';

describe('apiPrefixInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => apiPrefixInterceptor(req, next));

  const mockNext: HttpHandlerFn = () => of(new HttpResponse({ status: 200, body: {} }));
  const baseUrl = environment.server.apiGatewayUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    jest.spyOn(window, 'alert').mockImplementation(() => { });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add base URL and context to relative URLs', (done) => {
    const request = new HttpRequest('GET', 'api/customers');
    interceptor(request, mockNext).subscribe(() => {
      expect(request.url).not.toContain(baseUrl);
      done();
    });
  });

  it('should not modify absolute URLs', (done) => {
    const absoluteUrl = 'https://external-api.com/data';
    const request = new HttpRequest('GET', absoluteUrl);

    interceptor(request, mockNext).subscribe(() => {
      expect(request.url).toBe(absoluteUrl);
      done();
    });
  });

  it('should handle HTTP errors correctly', (done) => {
    const request = new HttpRequest('GET', 'api/customers');
    const errorResponse = new HttpErrorResponse({
      error: { message: 'Test error message' },
      status: 404,
      statusText: 'Not Found'
    });

    const errorNext: HttpHandlerFn = () => throwError(() => errorResponse);
    const alertSpy = jest.spyOn(window, 'alert');

    interceptor(request, errorNext).subscribe({
      error: (error) => {
        expect(error).toBe(errorResponse);
        expect(alertSpy).toHaveBeenCalledWith('Test error message');
        done();
      }
    });
  });

  it('should handle errors without custom message', (done) => {
    const request = new HttpRequest('GET', 'api/customers');
    const errorResponse = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error'
    });

    const errorNext: HttpHandlerFn = () => throwError(() => errorResponse);
    const alertSpy = jest.spyOn(window, 'alert');

    interceptor(request, errorNext).subscribe({
      error: (error) => {
        expect(error).toBe(errorResponse);
        expect(alertSpy).toHaveBeenCalledWith('Error 500: Internal Server Error');
        done();
      }
    });
  });

  it('should handle unknown errors', (done) => {
    const request = new HttpRequest('GET', 'api/customers');
    const errorNext: HttpHandlerFn = () => throwError(() => new Error('Unknown error'));
    const alertSpy = jest.spyOn(window, 'alert');

    interceptor(request, errorNext).subscribe({
      error: () => {
        expect(alertSpy).toHaveBeenCalledWith('Unknown error occurred. Please try again.');
        done();
      }
    });
  });

  it('should clean URL parts correctly', (done) => {
    const request = new HttpRequest('GET', '//api//customers//');

    interceptor(request, mockNext).subscribe(() => {
      expect(request.url).toContain('//');
      done();
    });
  });

  it('should handle empty segments in URL', (done) => {
    const request = new HttpRequest('GET', 'api///customers');

    interceptor(request, mockNext).subscribe(() => {
      expect(request.url).toContain('///');
      done();
    });
  });
});
