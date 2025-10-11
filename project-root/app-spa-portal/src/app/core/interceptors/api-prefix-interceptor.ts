import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SERVICE_URL_ENDPOINTS } from '../config/service-url-endpoints';
import { catchError, Observable, throwError } from 'rxjs';

export const apiPrefixInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const baseUrl = environment.server.apiGatewayUrl;
  const context = SERVICE_URL_ENDPOINTS.APPLICATION_CONTEXT;
  // Si la URL ya es absoluta, no modificarla
  if (isExternalUrl(req.url)) {
    return next(req).pipe(catchErrors());
  }
  // Construir la URL completa
  const fullUrl = buildUrl(baseUrl, context, req.url);
  const updatedRequest = req.clone({ url: fullUrl });
  return next(updatedRequest).pipe(catchErrors());
};


// Verifica si la URL ya es completa (http o https)
const isExternalUrl = (url: string): boolean => /^https?:\/\//i.test(url);

// Une segmentos de URL limpiando slashes (/) redundantes
const buildUrl = (...parts: string[]): string => parts.filter(Boolean).map(cleanUrlPart).join('/'); // filter(Boolean) Elimina null, undefined, ''

// Elimina '/' al inicio y final de un segmento
const cleanUrlPart = (part: string): string => part.replace(/((^\/+)|(\/+$))/g, '');


// Manejo de errores de forma limpia
const catchErrors = (): (source: Observable<HttpEvent<unknown>>) => Observable<HttpEvent<unknown>> => {
  return catchError((error: unknown) => {
    handleHttpError(error);
    return throwError(() => error);
  });
};

const handleHttpError = (error: unknown): void => {
  const message = extractErrorMessage(error);
  alert(message);
};

const extractErrorMessage = (error: unknown): string => {
  if (error instanceof HttpErrorResponse) {
    return error?.error?.message || `Error ${error?.status}: ${error?.statusText}`;
  }
  return 'Unknown error occurred. Please try again.';
};
