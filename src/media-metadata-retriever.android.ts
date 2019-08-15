import { Common, resolveFilePath } from './media-metadata-retriever.common';
import * as fs                     from 'tns-core-modules/file-system';
import { isString }                from 'tns-core-modules/utils/types';

export class MediaMetadataRetriever extends Common {
    private _mediaMetadataRetriever: android.media.MediaMetadataRetriever;
    private _imageFile: java.io.File;

    public static readonly _METADATA_KEY_ALBUM = android.media.MediaMetadataRetriever.METADATA_KEY_ALBUM;
    public static readonly _METADATA_KEY_ALBUMARTIST = android.media.MediaMetadataRetriever.METADATA_KEY_ALBUMARTIST;
    public static readonly _METADATA_KEY_ARTIST = android.media.MediaMetadataRetriever.METADATA_KEY_ARTIST;
    public static readonly _METADATA_KEY_AUTHOR = android.media.MediaMetadataRetriever.METADATA_KEY_AUTHOR;
    public static readonly _METADATA_KEY_BITRATE = android.media.MediaMetadataRetriever.METADATA_KEY_BITRATE;
    public static readonly _METADATA_KEY_CD_TRACK_NUMBER = android.media.MediaMetadataRetriever.METADATA_KEY_CD_TRACK_NUMBER;
    public static readonly _METADATA_KEY_COMPILATION = android.media.MediaMetadataRetriever.METADATA_KEY_COMPILATION;
    public static readonly _METADATA_KEY_COMPOSER = android.media.MediaMetadataRetriever.METADATA_KEY_COMPOSER;
    public static readonly _METADATA_KEY_DATE = android.media.MediaMetadataRetriever.METADATA_KEY_DATE;
    public static readonly _METADATA_KEY_DISK_NUMBER = android.media.MediaMetadataRetriever.METADATA_KEY_DISC_NUMBER;
    public static readonly _METADATA_KEY_DURATION = android.media.MediaMetadataRetriever.METADATA_KEY_DURATION;
    public static readonly _METADATA_KEY_GENRE = android.media.MediaMetadataRetriever.METADATA_KEY_GENRE;
    public static readonly _METADATA_KEY_HAS_AUDIO = android.media.MediaMetadataRetriever.METADATA_KEY_HAS_AUDIO;
    public static readonly _METADATA_KEY_HAS_VIDEO = android.media.MediaMetadataRetriever.METADATA_KEY_HAS_VIDEO;
    public static readonly _METADATA_KEY_HAS_LOCATION = android.media.MediaMetadataRetriever.METADATA_KEY_LOCATION;
    public static readonly _METADATA_KEY_HAS_MIMETYPE = android.media.MediaMetadataRetriever.METADATA_KEY_MIMETYPE;
    public static readonly _METADATA_KEY_NUM_TRACKS = android.media.MediaMetadataRetriever.METADATA_KEY_NUM_TRACKS;
    public static readonly _METADATA_KEY_TITLE = android.media.MediaMetadataRetriever.METADATA_KEY_TITLE;
    public static readonly _METADATA_KEY_VIDEO_HEIGHT = android.media.MediaMetadataRetriever.METADATA_KEY_VIDEO_HEIGHT;
    public static readonly _METADATA_KEY_VIDEO_ROTATION = android.media.MediaMetadataRetriever.METADATA_KEY_VIDEO_ROTATION;
    public static readonly _METADATA_KEY_VIDEO_WIDTH = android.media.MediaMetadataRetriever.METADATA_KEY_VIDEO_WIDTH;
    public static readonly _METADATA_KEY_WRITE = android.media.MediaMetadataRetriever.METADATA_KEY_WRITER;
    public static readonly _METADATA_KEY_YEAR = android.media.MediaMetadataRetriever.METADATA_KEY_YEAR;

    constructor() {
        super();
        this._mediaMetadataRetriever = new android.media.MediaMetadataRetriever();
        console.log("[nativescript-media-metadata-retriever]: MediaMetadataRetriever object created...");
    }

    public extractAllMetadata(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {
                resolve({
                    album: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_ALBUM),
                    albumartist: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_ALBUMARTIST),
                    artist: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_ARTIST),
                    author: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_AUTHOR),
                    bitrate: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_BITRATE),
                    cdtracknumber: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_CD_TRACK_NUMBER),
                    compilation: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_COMPILATION),
                    composer: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_COMPOSER),
                    date: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_DATE),
                    disknumber: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_DISK_NUMBER),
                    duration: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_DURATION),
                    genre: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_GENRE),
                    hasaudio: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_HAS_AUDIO),
                    haslocation: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_HAS_LOCATION),
                    hasmimetype: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_HAS_MIMETYPE),
                    hasvideo: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_HAS_VIDEO),
                    numtracks: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_NUM_TRACKS),
                    title: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_TITLE),
                    videoheight: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_VIDEO_HEIGHT),
                    videorotation: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_VIDEO_ROTATION),
                    width: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_VIDEO_WIDTH),
                    write: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_WRITE),
                    year: this._mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever._METADATA_KEY_YEAR)
                });
                console.log("[nativescript-media-metadata-retriever]: All metadata extracted...");
            } catch (ex) {
                console.log("[nativescript-media-metadata-retriever]: Failed to extract all metadata...");
                reject(ex);
            }
        });
    }

    public extractMetadata(keyCode: number): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            try {
                if (keyCode) {
                    resolve(this._mediaMetadataRetriever.extractMetadata(keyCode));
                    console.log("[nativescript-media-metadata-retriever]: Metadata extracted...");
                } else {
                    console.log("[nativescript-media-metadata-retriever]: keyCode is required...");
                    reject("[nativescript-media-metadata-retriever]: keyCode is required...");
                }
            } catch (ex) {
                console.log("[nativescript-media-metadata-retriever]: Failed to extract metadata...");
                reject(ex);
            }
        });
    }

    public getEmbeddedPicture(): Promise<android.graphics.Bitmap> {
        return new Promise<android.graphics.Bitmap>((resolve, reject) => {
            try {
                let bitmap = android.graphics.BitmapFactory.decodeByteArray(
                    this._mediaMetadataRetriever.getEmbeddedPicture(),
                    0,
                    this._mediaMetadataRetriever.getEmbeddedPicture().length
                );
                resolve(bitmap);
                console.log("[nativescript-media-metadata-retriever]: Bitmap generated...");
            } catch (ex) {
                console.log("[nativescript-media-metadata-retriever]: Failed to generate bitmap...");
                reject(ex);
            }
        });
    }

    public setDataSource(path: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {
                if (path) {
                    this._mediaMetadataRetriever.setDataSource(resolveFilePath(path));
                    console.log("[nativescript-media-metadata-retriever]: Data source has been set...");
                    resolve();
                } else {
                    // There is no path specified, reject the call!
                    console.log("[nativescript-media-metadata-retriever]: Failed to set data source...");
                    reject('[nativescript-media-metadata-retriever]: path is required');
                }
            } catch (ex) {
                console.log("[nativescript-media-metadata-retriever]: Failed to set data source...");
                reject(ex);
            }
        });
    }
}
