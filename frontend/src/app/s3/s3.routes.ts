import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AddBucketComponent } from "./pages/add-bucket/add-bucket.component";
import { BucketDetailComponent } from "./pages/bucket-detail/bucket-detail.component";

// TODO: remove landingcomponent or reintroduce a new path.
export const s3Routes: Routes = [
  {
    path: "s3",
    component: DashboardComponent,
  },
  {
    path: "s3/add-bucket",
    component: AddBucketComponent,
  },
  {
    path: "s3/buckets/:bucketName",
    component: BucketDetailComponent,
  },
];
