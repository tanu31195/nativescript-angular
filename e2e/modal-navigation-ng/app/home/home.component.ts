import { Component } from "@angular/core";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";

import { ViewContainerRefService } from "../shared/ViewContainerRefService";
import { ModalViewComponent } from "../modal-shared/modal-view.component";

@Component({
    selector: "modal-test",
    template: `
    <GridLayout rows="auto, auto, auto, *">
        <Button text="go to modal test page" [nsRouterLink]="['/modal']"></Button>
        <Button row="1" text="show shared modal" (tap)="onRootModalTap()"></Button>
        <Button row="2" text="go to second (to open shared modal)" [nsRouterLink]="['/second']"></Button>
        <Label row="3" text="HOME COMPONENT" verticalAlignment="bottom"></Label>
    </GridLayout>
    `
})
export class HomeComponent {
    constructor(
        private _modalService: ModalDialogService,
        private _viewContainerRefService: ViewContainerRefService
    ) { }

    onRootModalTap(): void {
        const options: ModalDialogOptions = {
            viewContainerRef: this._viewContainerRefService.root,
            context: {},
            fullscreen: true
        };

        this._modalService.showModal(ModalViewComponent, options)
            .then((result: string) => {
                console.log(result);
            });
    }
}
