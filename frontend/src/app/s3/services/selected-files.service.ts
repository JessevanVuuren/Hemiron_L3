import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedFilesService {

  public selectedFiles: string[] = []

  constructor() {
  }
}
