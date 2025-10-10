import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'; // o es-EC si necesitas Ecuador

registerLocaleData(localeEs); // <-- Esto es crucial // Registrar el locale es-EC manualmente

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
