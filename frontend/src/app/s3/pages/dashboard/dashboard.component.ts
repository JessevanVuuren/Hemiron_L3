import { AfterViewInit, Component, OnInit } from '@angular/core';
import {BucketService} from "../../services/bucket.service";
import {Bucket} from "../../models/bucket.model";
import {UnitService} from "../../services/unit.service";
import {Router} from "@angular/router";
import { ProjectService } from 'src/app/project/services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  private buckets: Bucket[] = [];

  public searchValue: string = '';
  public filteredBuckets: Bucket[] = [];

  public projectPath: string | undefined;

  constructor(
    private router: Router,
    private bucketService: BucketService,
    public unitService: UnitService,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.refreshBuckets();
  }

  ngAfterViewInit(): void {
    this.projectPath = this.projectService.currentProject?.path
  }

  public updateFilter(searchValue: string): void {
    this.filteredBuckets = this.buckets.filter(bucket => {
      const name = bucket.name.toLowerCase();
      const query = searchValue.toLowerCase();

      return name.includes(query);
    })
  }

  public refreshBuckets(): void {
    this.buckets = [];
    this.bucketService.getBuckets().subscribe((buckets: Bucket[]) => {
      this.buckets = buckets;
      this.updateFilter(this.searchValue);
    });
  }

  public getTotalBuckets(): number {
    return this.buckets.length;
  }

  public getTotalObjects(): number {
    return this.buckets.reduce((count, bucket) => {
      return count + bucket.amountOfObjects;
    }, 0);
  }

  public getTotalSize(): number {
    return this.buckets.reduce((size, bucket) => {
      return size + bucket.size;
    }, 0);
  }

  public async addBucket(): Promise<void> {
    await this.router.navigate(["project", this.projectPath, "s3","add-bucket"]);
  }

  public async navigateBucketPage(bucket: Bucket): Promise<void> {
    await this.router.navigate(["project", this.projectPath, "s3", "buckets", bucket.name], {
      state: {
        bucket: bucket
      }
    })
  }
}
