import { Component, OnInit }                 from '@angular/core';
import { MediaMetadataRetriever }            from 'nativescript-media-metadata-retriever';
import { hasPermission, requestPermissions } from 'nativescript-permissions';
import { ImageSource }                       from 'tns-core-modules/image-source';
import { TextField }                         from 'tns-core-modules/ui/text-field';
import { Pixels }                            from '../../../src/media-metadata-retriever.common';

declare var android;


@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    mmr: MediaMetadataRetriever;
    dataIsLoading = false;
    path: string = '~/assets/small.mp4';
    allMetadata: string;
    image = new ImageSource();

    constructor() { }

    ngOnInit(): void {
        this.getPermissions();
        this.mmr = new MediaMetadataRetriever();
    }

    //Get the metadata when the button is pressed
    getMetadata() {
        if(!this.dataIsLoading) {
            //Set the data source for the media file
            this.mmr.setDataSource(this.path + '')
                .then(() => {
                    this.dataIsLoading = true;
                    this.mmr.extractAllMetadata()
                        .then((args) => {
                            this.allMetadata = JSON.stringify(args);
                        });
                });
        }

    }

    getFrameAtIndex(args: any) {
        let textField = <TextField>args.object;
        if(this.dataIsLoading) {
            const frameIndex = +textField.text;
            this.mmr.getFrameAtIndex(frameIndex)
                .then((bitmap: any) => {
                    this.image = new ImageSource();
                    this.image.setNativeSource(bitmap);
                });

            this.mmr.getFramePixelsAtIndex(frameIndex)
                .then((pixels: Pixels) => {
                    console.log(`The first pixel is r: ${pixels.pixels[0]} g: ${pixels.pixels[1]} b: ${pixels.pixels[2]}`)
                });
        }
    }

    //This app needs storage permission
    getPermissions(): void {
        if (!hasPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE)) {
            console.log("Asking for permissions...");
            requestPermissions([
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
