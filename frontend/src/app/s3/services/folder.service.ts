import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FolderService {
    public getCurrentFolder: () => string = this.defaultFn;

    public setFunctionPointer(fn: () => string){
        this.getCurrentFolder = fn;
    }

    private defaultFn(): string {
        return "";
    }

}
