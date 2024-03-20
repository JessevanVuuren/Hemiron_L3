import { Component, Input, OnInit } from "@angular/core";
import { Bucket } from "../../models/bucket.model";
import { Item } from "../../models/item.model";
import { UnitService } from "../../services/unit.service";
import { BucketService } from "../../services/bucket.service";
import { DateService } from "../../services/date.service";
import { animate, style, transition, trigger } from "@angular/animations";
import { ObjectService } from "../../services/object.service";
import { ConfirmationService } from "primeng/api";
import { SelectedFilesService } from "../../services/selected-files.service";
import { RefreshService } from "../../services/refresh.service";
import { FolderService } from "../../services/folder.service";

@Component({
	selector: "app-objects-browser",
	templateUrl: "./objects-browser.component.html",
	styleUrls: ["./objects-browser.component.scss"],
	animations: [
		trigger("fadeAnimation", [
			transition(":enter", [style({ opacity: 0 }), animate("100ms", style({ opacity: 1 }))]),
			transition(":leave", [style({ opacity: 1 }), animate("100ms", style({ opacity: 0 }))]),
		]),
	],
})
export class ObjectsBrowserComponent implements OnInit {
	@Input() bucket!: Bucket;

	public directories: string[] = [];
	public items: Item[] = [];
	public fetching: boolean = false;
	public error: boolean = false;

	constructor(
		private objectservice: ObjectService,
		private bucketService: BucketService,
		public unitService: UnitService,
		public dateService: DateService,
		private confirmationService: ConfirmationService,
		public selectedFilesService: SelectedFilesService,
		public refreshService: RefreshService,
		private folderService: FolderService
	) {}

	ngOnInit(): void {
		this.refreshService.setFunction(this.loadBasedirectoryContents.bind(this));
		this.loadDirectoryContents("/");
		this.folderService.setFunctionPointer(this.getAbsolutePath.bind(this));
	}

	public getAbsolutePath() {
		return (
			" / " +
			this.getCurrentDirectory()
				.split("/")
				.filter(path => path != "")
				.join(" / ")
		);
	}

	public getTrimmedObjectName(objectPath: string): string {
		return (
			objectPath
				.split("/")
				.filter(path => path !== "")
				.pop() || ""
		);
	}

	public loadDirectoryContents(objectPath: string): void {
		this.fetching = true;
		this.bucketService.getBucketObjectsDirectory(this.bucket!.name, objectPath).subscribe(
			items => {
				this.items = this.sortItemsByObjectNameAndType(items);
				this.fetching = false;
				this.directories.push(objectPath);
			},
			() => this.handleBucketObjectsDirectoryError()
		);
	}

	public loadBasedirectoryContents(): void {
		this.fetching = true;
		this.bucketService.getBucketObjectsDirectory(this.bucket!.name, "/").subscribe(
			items => {
				this.items = this.sortItemsByObjectNameAndType(items);
				this.fetching = false;
				this.directories.push("/");
			},
			() => this.handleBucketObjectsDirectoryError()
		);
	}

	public loadPreviousDirectoryContents(): void {
		const previousDirectory: string = this.getPreviousDirectory();

		this.fetching = true;
		this.bucketService.getBucketObjectsDirectory(this.bucket.name, previousDirectory).subscribe(
			items => {
				this.items = this.sortItemsByObjectNameAndType(items);
				this.fetching = false;
				if (previousDirectory !== this.getCurrentDirectory()) {
					this.directories.pop();
				}
			},
			() => this.handleBucketObjectsDirectoryError()
		);
	}

	private handleBucketObjectsDirectoryError() {
		this.fetching = false;
		this.error = true;

		setTimeout(() => {
			this.error = false;
		}, 2000);
	}

	private getCurrentDirectory(): string {
		if (this.directories.length == 0) {
			return "/";
		}
		return this.directories[this.directories.length - 1];
	}

	private getPreviousDirectory(): string {
		const index = this.directories.length - 2;

		if (index < 0) {
			return "/";
		}

		return this.directories[index];
	}

	public downloadFile(item: Item) {
		const bucketname = this.bucket.name;
		const objectname = item.objectName;
		const objectnameB64 = btoa(objectname);
		this.objectservice.downloadFile(bucketname, objectnameB64).subscribe((data: Blob) => {
			const blob = new Blob([data], { type: "application/octet-stream" });
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = objectname;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		});
	}

	public deleteFile(event: Event, item: Item) {
		const bucketname = this.bucket.name;
		let objectname = item.objectName;

		if (objectname.substring(objectname.length - 1) == "/") {
			objectname += "_";
		}
		const objectnameB64 = btoa(objectname);

		this.confirmationService.confirm({
			target: event.target as EventTarget,
			message: "Weet u zeker dat u " + objectname + " wil verwijderen?",
			icon: "fas fa-triangle-exclamation",
			accept: () => {
				this.objectservice.deleteFile(bucketname, objectnameB64).subscribe(() => {
					this.loadDirectoryContents("/");
				});
			},
			reject: () => {},
		});
	}

	private sortItemsByObjectNameAndType(items: Item[]): Item[] {
		return items
			.sort((a: Item, b: Item) => {
				return this.getTrimmedObjectName(a.objectName)?.localeCompare(this.getTrimmedObjectName(b.objectName));
			})
			.sort((a: Item, b: Item) => {
				return (b.dir ? 1 : 0) - (a.dir ? 1 : 0);
			});
	}
}
