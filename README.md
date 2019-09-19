# Playing With Fire

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### To Run cloud functions locally
Angular Project
* `$ npm run serve:api`

Cloud functions
* `$ cd functions`
* `$ npm run serve`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Documentation

* `npm run docs`
* [Wiki](https://bitbucket.org/andromeda16/portal/wiki/Home)

If you want to easily run the docs locally, globally install the Compodoc and then docs can be run on `localhost:8080`

* `npm install -g @compodoc/compodoc`
* `compodoc -s`

## Releases

- `$ git checkout master && git pull`
- `$ npm version major|minor|patch` to set the production version
- `$ npm run release` to update the release branch and initiate a release
- `$ ng build -c production`
- `$ firebase list`
- `$ firebase use <db name>`
- `$ firebase deploy`
- `$ npm version prerelease --preid=<next-version-name>` to set the prerelease version
