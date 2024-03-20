import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { BucketService } from "../../services/bucket.service";
import { Router } from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import { ProjectService } from 'src/app/project/services/project.service';

@Component({
  selector: 'app-add-bucket',
  templateUrl: './add-bucket.component.html',
  styleUrls: ['./add-bucket.component.scss']
})
export class AddBucketComponent implements OnInit, AfterViewInit {

  public formGroup: UntypedFormGroup = new UntypedFormGroup({
    bucketName: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(63),
      this.regexValidator("characters", /^[a-z0-9.-]+$/), // Bucket names can consist only of lowercase letters, numbers, dots and hyphens
      this.regexValidator("pattern", /^(?!.*(\.{2}|[-.]{2}|[-.]{1,}\.|\.[-.]{1,})).*$/), // Bucket names must not contain two adjacent periods, or a period adjacent to a hyphen
      this.regexValidator("begin-end", /^(?![-.])(?!.*[-.]$)[a-zA-Z0-9.-]+$/), // Bucket names must not start or end with a dot or hyphen
      this.regexValidator("ip", /^(?!([0-9]{1,3}\.){3}[0-9]{1,3}$).*/), // Bucket names must not be formatted as an IP address
      this.regexValidator("prefix", /^(?!xn--).*/), // Bucket names must not start with the prefix xn--
      this.regexValidator("suffix", /^(?!.*-s3alias$).*/) // Bucket names must not end with the suffix -s3alias
    ])
  });

  public bucketAlreadyExistsError: boolean = false;
  public bucketUnexpectedError: boolean = false;
  public projectPath: string | undefined;

  constructor(
    private bucketService: BucketService,
    private projectService: ProjectService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(() => {
      this.bucketAlreadyExistsError = false;
      this.bucketUnexpectedError = false;
    })
  }

  ngAfterViewInit(): void {
    this.projectPath = this.projectService.currentProject?.path
  }

  public createBucket(): void {
    if (this.formGroup.valid) {
      const bucketName = this.formGroup.get("bucketName")?.value

      this.bucketService.createBucket(bucketName).subscribe(async () => {
        await this.router.navigate(['project', this.projectPath, 's3', 'buckets', bucketName]);
      }, (error: HttpErrorResponse) => {
        if (error.status == 409) {
          this.bucketAlreadyExistsError = true;
        } else {
          this.bucketUnexpectedError = true;
        }
      })
    }
  }

  private regexValidator(key: string, regExp: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      if (regExp.test(control.value)) {
        return null;
      }

      return {
        [key]: true
      }
    }
  }
}
