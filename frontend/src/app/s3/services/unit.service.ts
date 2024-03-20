import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  public convertBytesToUnits(bytes: number): string {
    const units: string[] = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    const index: number = Math.floor(Math.log(bytes) / Math.log(1024));
    const size: string = (bytes / Math.pow(1024, index)).toFixed(2);

    if (bytes == 0) {
      return `${bytes} ${units[0]}`;
    }

    return `${size} ${units[index]}`;
  }
}
