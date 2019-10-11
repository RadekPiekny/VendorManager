import { Injectable } from "@angular/core";


@Injectable({
    providedIn: "root"
})
export class InputSelectService {
    open: boolean = false;
    data: any;
    PositionX: number;
    PositionY: number;
    elementWidth: number;
}