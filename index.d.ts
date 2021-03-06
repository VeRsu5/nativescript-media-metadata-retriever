import { Common } from './media-metadata-retriever.common';

export declare class MediaMetadataRetriever extends Common {
  // define your typings manually
  // or..
  // use take the ios or android .d.ts files and copy/paste them here

  /**
   * Set of keyCodes
   */
  static readonly _METADATA_KEY_ALBUM: number;
  static readonly _METADATA_KEY_ALBUMARTIST: number;
  static readonly _METADATA_KEY_ARTIST: number;
  static readonly _METADATA_KEY_AUTHOR: number;
  static readonly _METADATA_KEY_BITRATE: number;
  static readonly _METADATA_KEY_CD_TRACK_NUMBER: number;
  static readonly _METADATA_KEY_COMPILATION: number;
  static readonly _METADATA_KEY_COMPOSER: number;
  static readonly _METADATA_KEY_DATE: number;
  static readonly _METADATA_KEY_DISK_NUMBER: number;
  static readonly _METADATA_KEY_DURATION: number;
  static readonly _METADATA_KEY_GENRE: number;
  static readonly _METADATA_KEY_HAS_AUDIO: number;
  static readonly _METADATA_KEY_HAS_VIDEO: number;
  static readonly _METADATA_KEY_HAS_LOCATION: number;
  static readonly _METADATA_KEY_HAS_MIMETYPE: number;
  static readonly _METADATA_KEY_NUM_TRACKS: number;
  static readonly _METADATA_KEY_TITLE: number;
  static readonly _METADATA_KEY_VIDEO_HEIGHT: number;
  static readonly _METADATA_KEY_VIDEO_ROTATION: number;
  static readonly _METADATA_KEY_VIDEO_WIDTH: number;
  static readonly _METADATA_KEY_WRITE: number;
  static readonly _METADATA_KEY_YEAR: number;
  
  /**
   * Get all metadata of the file
   * @return {Promise<any>} - The JSON with metadata
   */
  extractAllMetadata(): Promise<any>;
  
  /**
   * Get the metadata with the given keyCode of the file
   * @param {keyCode} - The number specifying file metadata type
   * @returns {Promise<any>} - The JSON with metadata
   */
  extractMetadata(keyCode: number): Promise<any>;
  
  /**
   * Get the Bitmap object of the embedded picture
   * @returns {Promise<any>} - The Bitmap of the embedded picture from the file
   */
  getEmbeddedPicture(): Promise<any>;
  
  /**
   * @param {path} - The media file path
   * @returns {Promise<any>} - void
   */
  setDataSource(path: string): Promise<any>;
  
}
