# PlayingWithFire-Fireside

Node 14
Angular 13
Firebase SDK 9

## Project Configuration

The root of this repository contains the Firebase configuration with subfolders for each code project.

* Angular under /angular
* Cloud Functions under /functions

## Getting Started

Add a file named `firebase.config.json` to the /angular/src folder and copy your project config into this file.

On a linux/unix commandline you can do this with: `firebase apps:sdkconfig > angular/src/firebase.config.json`

Either way, make sure the contents of the file are properly formatted JSON.

## Commands

* Run Angular project `npm start`
* Run Emulators `npm run serve`
* Lint `npm run lint`
* Test `npm run test`
* Build `npm run build`
* Deploy `npm run deploy`

### Emulated Development

In order to run the project in the local emulator you'll need to run emulators (see commands above) and configure the Angular project to use the emulated services instead of the deployed project resources. Open the environment file (/angular/src/environments/environment.ts for the local environment) and set `useEmulator: true`.
