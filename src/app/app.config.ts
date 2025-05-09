import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { firebaseConfig } from './shared/firebase';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Import the modular Firebase SDK functions
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)), // Initialize Firebase app
    provideFirestore(() => getFirestore()), // Provide Firestore
    provideAuth(() => getAuth()), // Provide Authentication
    provideDatabase(() => getDatabase()), // Provide Realtime Database
    provideStorage(() => getStorage()), // Provide Storage
    importProvidersFrom([CommonModule, ReactiveFormsModule, RouterModule]),
  ],
};
