import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AccessValue } from '../../models/access-value';
import { MatSnackBar } from '@angular/material/snack-bar';

//  email regex use by w3
// https://www.w3.org/TR/2012/WD-html-markup-20120320/input.email.html
export const EmailRegex: RegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Injectable({ providedIn: 'root'})
export class HelperService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  /**
   * @returns ClientAccessLevels
   */
  async getClientAccessLevels() {
    const valuesList: AccessValue[] = [];
    const snapshot = await firebase.database().ref().child('config/clientAccessLevels').once('value');
    const values = snapshot.val();

    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const access = {
          access: values[key].access,
          description: values[key].description
        };
        valuesList.push(access);
      }
    }
    return valuesList;
  }

  /**
   * @returns Project Access Levels
   */
  async getProjectAccessLevels() {
    const valuesList: AccessValue[] = [];
    const snapshot = await firebase.database().ref().child('config/projectAccessLevels').once('value');
    const values = snapshot.val();

    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const access = {
          access: values[key].access,
          description: values[key].description
        };
        valuesList.push(access);
      }
    }
    return valuesList;
  }

  handleSuccess(message: string) {
    this.snackbar.open(`Succcess: ${message}`, 'ok', {
      duration: 2000,
      panelClass: [ 'snackbar-success' ]
    });
  }

  handleError(message: string) {
    this.snackbar.open(`Error: ${message}`, 'close', {
      panelClass: [ 'snackbar-error' ]
    });
  }

}
