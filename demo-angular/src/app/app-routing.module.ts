import { NgModule }                 from "@angular/core";
import { Routes }                   from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AppComponent }             from '~/app/app.component';

const routes: Routes = [
    { path: "", redirectTo: "/app", pathMatch: "full" },
    { path: "app", component: AppComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
