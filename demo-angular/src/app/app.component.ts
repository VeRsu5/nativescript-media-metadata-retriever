import { Component, OnInit }                 from '@angular/core';
import { MediaMetadataRetriever }            from 'nativescript-media-metadata-retriever';
import { hasPermission, requestPermissions } from 'nativescript-permissions';
import { ImageSource }                       from 'tns-core-modules/image-source';

declare var android;


@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    mmr: MediaMetadataRetriever;
    path: string = '~/assets/small.mp4';
    allMetadata: string;
    image: ImageSource;

    constructor() { }

    ngOnInit(): void {
        this.getPermissions();
        this.mmr = new MediaMetadataRetriever();
    }

    //Get the metadata when the button is pressed
    getMetadata() {
        //Set the data source for the media file
        this.mmr.setDataSource(this.path + '')
            .then(() => {
                this.mmr.extractAllMetadata()
                    .then((args) => {
                        this.allMetadata = JSON.stringify(args);
                    });
            });
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
