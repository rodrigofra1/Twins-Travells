import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideIonicAngular } from '@ionic/angular/standalone';

export const appConfig = [
  provideRouter(routes),
  provideHttpClient(withInterceptorsFromDi()),
  provideIonicAngular()
];
