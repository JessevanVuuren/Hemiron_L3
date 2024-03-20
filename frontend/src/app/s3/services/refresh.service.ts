import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  public refresh: () => void = () => {};

  public setFunction(fn: () => void){
    this.refresh = fn;
  }
}
