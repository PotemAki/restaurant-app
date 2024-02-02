// import { Injectable } from '@angular/core';

// declare var google: any;

// @Injectable({
//   providedIn: 'root',
// })
// export class MapService {
//   private isScriptLoaded = false;

//   loadScript(): Promise<void> {
//     return new Promise<void>((resolve, reject) => {
//       if (this.isScriptLoaded) {
//         resolve();
//       } else {
//         const script = document.createElement('script');
//         script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCPA3FgCSNSSLrVkJaJDcGFPDk0v4yKUHY&callback=initializeMap`;
//         script.async = true;
//         script.defer = true;
//         document.body.appendChild(script);

//         script.onload = () => {
//           this.isScriptLoaded = true;
//           resolve();
//         };

//         script.onerror = (error: Event | string) => reject(error);
//       }
//     });
//   }
// }
