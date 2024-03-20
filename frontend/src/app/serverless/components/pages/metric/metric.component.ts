import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetFunctionByIdResponse, TaskResolutionType } from 'src/app/serverless/data/function.data';
import { FunctionService } from 'src/app/serverless/services/function.service';
import { DatePipe } from "@angular/common";
import { environment } from "../../../../../environments/environment";
import { ProjectService } from 'src/app/project/services/project.service';

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss']
})
export class MetricComponent implements OnInit {
  _function!: GetFunctionByIdResponse;
  projectId: string | undefined;
  hasError: boolean = false;
  error!: string;
  isLoading = false;
  showErrorToast = false;
  toastMessage: string = ""

  constructor(private route: ActivatedRoute, private service: FunctionService, private projectService: ProjectService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.isLoading = true; // Start loading
    this.projectId = this.projectService.currentProject?.id;
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getfunctioninfo(id);
    })
  }

  getfunctioninfo(id: string) {
    if (this.projectId == undefined) {
      this.returnProjectIdNotFoundToast();
      return;
    }

    this.service.get(id, this.projectId).subscribe({
      next: (func) => this._function = func,
      error: (err) => {
        this.hasError = true;
        console.log(err)
        this.error = err.error.detail;
      }
    });
  }

  transformDate(date: string): string {
    return <string>this.datePipe.transform(date, 'dd/MM/y, HH:mm', '+02:00');
  }

  handleRefresh(): void {
    this.getfunctioninfo(this._function.id);
  }

  private returnProjectIdNotFoundToast() {
    this.toastMessage = "Er kan geen project ID gevonden worden.";
    this.showErrorToast = true;

    setTimeout(() => {
      this.showErrorToast = false;
    }, 4000);
  }

  handleDelete(): void {
    if (this.projectId == undefined) {
      this.returnProjectIdNotFoundToast();
      return;
    }
    this.service.delete(this._function.id, this.projectId).subscribe({
      error: (err) => { this.hasError = true; this.error = this.error = err.message }
    })

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.navigate(['dashboard/serverless']);
  }

  protected readonly TaskResolutionType = TaskResolutionType;
  protected readonly environment = environment;
}
