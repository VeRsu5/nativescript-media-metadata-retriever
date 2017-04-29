# Media Metadata Retriever Plugin for Nativescript

This plugin is based on the [MediaMetadataRetriever](https://developer.android.com/reference/android/media/MediaMetadataRetriever.html) in Android.

## Installation

`tns plugin add nativescript-media-metadata-retriever`

## Usage

This plugin is used to extract media metadata like albumname, artist, title, etc. from media files.
This plugin can only be used in Android.

## Example (Angular)

### Typescript file (app.component.ts)

```
import { Component, OnInit } from "@angular/core";
import { MediaMetadataRetriever } from "nativescript-media-metadata-retriever";
import { Page } from "ui/page";
import { ImageFormat } from "ui/enums";

import * as imageSource from "image-source";
import * as fs from "file-system";
import * as permissions from "nativescript-permissions";  //Recommended
declare var android;

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.css"]
})

export class AppComponent { 
    path: string;
    artist: string;
    title: string;
    mmr: MediaMetadataRetriever;
    bitArray: Array<number>;
    allMetadata: string;
    src: string;

    constructor(private page: Page) { }

    ngOnInit(): void {
        this.mmr = new MediaMetadataRetriever();    //Create the object of the classs
    }

    //Get the metadata when the button is pressed
    getMetadata() {
        //Set the data source for the media file
        this.mmr.setDataSource(this.path + '');

        //Get a particular metadata
        this.mmr.extractMetadata(MediaMetadataRetriever._METADATA_KEY_TITLE)    //For title of media
        .then((args) => {
            this.title = args;
        });
        this.mmr.extractMetadata(MediaMetadataRetriever._METADATA_KEY_ARTIST)   //For artist name
        .then((args) => {
            this.artist = args;
        });

        //Get all the metadata
        this.mmr.extractAllMetadata()
        .then((args) => {
            this.allMetadata = JSON.stringify(args);
            /*
            You can also use args.title, args.artist, args.album ...
            as it includes a JSON array of objects
           */
        });

        //Get the Embedded Picture(Bitmap)
        this.mmr.getEmbeddedPicture()
        .then((args) => {
            var albumArt = this.page.getViewById("albumArt"); //Where albumArt is the ID of an Image element
            var img = new imageSource.ImageSource();
            img.setNativeSource(args);
            albumArt.set("src", img);
            console.log("ImageSource set...");
        })
        .catch((ex) => {
            //Do something else
            console.log("Failed to set ImageSource..." + ex);
        });
    }

    //This app needs storage permission
    //P.S. this is not necessary as you can do it manually by going into App Settings
    getPermissions(): void {
        if (!permissions.hasPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE)) {
            console.log("Asking for permissions...");
            permissions.requestPermissions([
                android.Manifest.permission.READ_EXTERNAL_STORAGE,
                android.Manifest.permission.WRITE_EXTERNAL_STORAGE
            ])
            .then(() => {
                console.log("Permissions granted...");
            })
            .catch(() => {
                console.log("Permissions denied...");
            })
        } else {
            console.log("App has necessary permissions...");
        }
    }
}

```

### API

Set the data source for media file
- **setDataSource(path: string): Promise<any>**

Extract a single metadata based on given keycode
- **extractMetadata(keyCode: number): Promise<string>**

Extract all the metadata from the media file
- **extractAllMetadata(): Promise<any>**

Get the embedded picture from the file (Bitmap)
- **getEmbeddedPicture(): Promise<android.graphics.Bitmap>**


### KEYCODES

- **_METADATA_KEY_ALBUM**
- **_METADATA_KEY_ALBUMARTIST**
- **_METADATA_KEY_ARTIST**
- **_METADATA_KEY_AUTHOR**
- **_METADATA_KEY_BITRATE**
- **_METADATA_KEY_CD_TRACK_NUMBER**
- **_METADATA_KEY_COMPILATION**
- **_METADATA_KEY_COMPOSER**
- **_METADATA_KEY_DATE**
- **_METADATA_KEY_DISK_NUMBER**
- **_METADATA_KEY_DURATION**
- **_METADATA_KEY_GENRE**
- **_METADATA_KEY_HAS_AUDIO**
- **_METADATA_KEY_HAS_VIDEO**
- **_METADATA_KEY_HAS_LOCATION**
- **_METADATA_KEY_HAS_MIMETYPE**
- **_METADATA_KEY_NUM_TRACKS**
- **_METADATA_KEY_TITLE**
- **_METADATA_KEY_VIDEO_HEIGHT**
- **_METADATA_KEY_VIDEO_ROTATION**
- **_METADATA_KEY_VIDEO_WIDTH**
- **_METADATA_KEY_WRITE**
- **_METADATA_KEY_YEAR**

### Note

  You can also use **extractAllMetadata(): Promise<any>** to get some specified result like title, album, albumartist, artist, etc. as shown below

  ```
  this.mmr.extractAllMetadata()
        .then((args) => {
            this.albumartist = args.albumartist;
            this.artist = args.artist; 
            this.author = args.author; 
            this.bitrate = args.bitrate;
            this.cdtracknumber = args.cdtracknumber;
            this.compilation = args.compilation; 
            this.composer = args.composer; 
            this.date = args.date; 
            this.disknumber = args.disknumber;
            this.duration = args.duration;
            this.genre = args.genre;
            this.hasaudio = args.hasaudio;
            this.haslocation = args.haslocation;
            this.hasmimetype = args.hasmimetype;
            this.hasvideo = args.hasvideo;
            this.numtracks = args.numtracks;
            this.title = args.title;
            this.videorotation = args.videorotation;
            this.width = args.width;
            this.write = args.write;
            this.year = args.year;
            ...
        });
  ```
