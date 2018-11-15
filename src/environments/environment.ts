// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  version: 'dev',
  production: false,
  hmr: false,
  firebase: {
    apiKey: "AIzaSyDpZ4KOoFW3WRDK0R1T4F-HT9wtwuTIVjQ",
    authDomain: "ristrutturare-f830e.firebaseapp.com",
    databaseURL: "https://ristrutturare-f830e.firebaseio.com",
    projectId: "ristrutturare-f830e",
    storageBucket: "ristrutturare-f830e.appspot.com",
    messagingSenderId: "629343470468"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
