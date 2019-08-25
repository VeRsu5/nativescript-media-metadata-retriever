import { Observable } from 'tns-core-modules/data/observable';
import * as app       from 'tns-core-modules/application';
import { isString }   from 'tns-core-modules/utils/types';
import * as fs        from 'tns-core-modules/file-system';

export class Common extends Observable {
  public message: string;

  constructor() {
    super();
    this.message = Utils.SUCCESS_MSG();
  }
}

export class Utils {
  public static SUCCESS_MSG(): string {
    let msg = `[nativescript-media-metadata-retriever]: Plugin is working on ${app.android ? 'Android' : 'iOS'}.`;

    setTimeout(() => {
      console.log(`${msg} Enjoy :p!`);
    }, 2000);

    return msg;
  }
}

export class Pixels {
  pixels: number[];
  width: number;
  height: number;
}

/**
 * Helper function to determine if string is a url.
 * @param value [string]
 */
export function isStringUrl(value: string): boolean {
  // check if artURL is a url or local file
  let isURL = false;
  if (value.indexOf('://') !== -1) {
    if (value.indexOf('res://') === -1) {
      isURL = true;
    }
  }
  return isURL;
}

/**
 * Will determine if a string is a url or a local path. If the string is a url it will return the url.
 * If it is a local path, then the file-system module will return the file system path.
 * @param path [string]
 */
export function resolveFilePath(path: string) {
  if (path) {
    const isUrl = isStringUrl(path);
    if (isUrl === true) {
      return path;
    } else {
      let fileName = isString(path) ? path.trim() : '';
      if (fileName.indexOf('~/') === 0) {
        fileName = fs.path.join(fs.knownFolders.currentApp().path, fileName.replace('~/', ''));
      }
      return fileName;
    }
  }
  return path;
}
