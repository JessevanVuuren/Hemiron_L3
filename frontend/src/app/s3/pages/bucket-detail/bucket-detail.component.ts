import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Bucket} from "../../models/bucket.model";
import {BucketService} from "../../services/bucket.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ObjectService} from "../../services/object.service";
import {FileUploadHandlerEvent} from "primeng/fileupload";
import {ConfirmationService, MessageService} from "primeng/api";
import {SelectedFilesService} from "../../services/selected-files.service";
import { InputTextModule } from 'primeng/inputtext';
import {RefreshService} from "../../services/refresh.service";
import {FolderService} from "../../services/folder.service";

@Component({
  selector: 'app-bucket-detail',
  templateUrl: './bucket-detail.component.html',
  styleUrls: ['./bucket-detail.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class BucketDetailComponent implements OnInit {

  public path: string = "";
  public bucket: Bucket;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bucketService: BucketService,
    private objectService: ObjectService,
    private confirmationService: ConfirmationService,
    public selectedFileService: SelectedFilesService,
    private messageService: MessageService,
    private refreshService: RefreshService,
    private folderService: FolderService
  ) {
    this.bucket = router.getCurrentNavigation()?.extras.state?.["bucket"];
  }

  ngOnInit(): void {
    if (!this.bucket) {
      this.route.paramMap.subscribe(paramMap => {
        this.initializeBucket(paramMap.get("bucketName")!)
      })
    }
  }

  public uploadFile(event: FileUploadHandlerEvent, InputFile: any){
    const bucketname = this.bucket.name;
    const file = event.files[0];
    const currentFolder = this.folderService.getCurrentFolder().replace(/ /g, '');
    let prefix = "";
    if (currentFolder != "/") {
      prefix = currentFolder + '/'
    }
    const renamedFile = new File([file], prefix + file.name, {type: file.type});
    this.objectService.uploadFile(bucketname, renamedFile).subscribe(() => {
      InputFile.clear();
      this.refreshService.refresh();
    });
  }

  public createFolder(event: Event){
    this.path = this.folderService.getCurrentFolder().replace(/ /g, '');
    if (this.path != "/") this.path = this.path.concat('/');
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: 'Folder Aanmaken',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-text p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      key: "folder",

      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: this.path + ' is aangemaakt' });
        this.objectService.createVirtualFolder(this.bucket.name, this.path).subscribe(() => {
          this.refreshService.refresh();
        });
      },
      reject: () => {
      }
    });
  }

  public deleteMultipleFiles(event: Event){
    const bucketname = this.bucket.name;
    let b64ObjectNames: string[] = [];
    for (let item of this.selectedFileService.selectedFiles){
      if (item.substring(item.length - 1) == '/'){
        item += '_';
      }
      b64ObjectNames.push(btoa(item))
    }
    if (b64ObjectNames.length != 0){
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Weet u zeker dat u ' + b64ObjectNames.length + '  objecten wil verwijderen?',
        icon: 'fas fa-triangle-exclamation',
        accept: () => {
          this.objectService.deleteMultipleFiles(bucketname, b64ObjectNames).subscribe( () => {
            this.refreshService.refresh();
          });
        },
        reject: () => {}
      });
    }
  }

  private initializeBucket(bucketName: string): void {
    this.bucketService.getBucket(bucketName).subscribe((bucket: Bucket) => {
      this.bucket = bucket;
    }, (error: HttpErrorResponse) => {
      if (error.status == 403) {
        // TODO: navigate to unauthorized page
      }
      if (error.status == 404) {
        // TODO: navigate to not found page
      }
      if (error.status == 500) {
        // TODO: navigate to internal error page
      }
    })
  }
}
