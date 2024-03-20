import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ProjectService } from "../../services/project.service";
import { Project } from "../../models/project";
import { CreateProject } from "../../models/create-project";

@Component({
  selector: "app-update-project-dialog",
  templateUrl: "./update-project-dialog.component.html",
  styleUrl: "./update-project-dialog.component.scss",
})
export class UpdateProjectDialogComponent {
  projectForm = this.formBuilder.group({
    name: ["", { validators: [Validators.pattern(/^[a-zA-Z0-9 _'-]+$/), Validators.required, Validators.minLength(3), Validators.maxLength(32)], updateOn: 'blur' }],
    description: ["", { validators: [Validators.maxLength(255)], updateOn: 'blur' }], 
  });
  project: Project;
  message: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    this.project = config.data.project;
    this.projectForm.patchValue({name: this.project.name});
    this.projectForm.patchValue({description: this.project.description})
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      return
    }

    const name = this.projectForm.value.name;
    const description = this.projectForm.value.description ? this.projectForm.value.description : '';
    
    if (name && this.project.id) {
      const project: CreateProject = {
        name: name,
        description: description,
      };
      this.projectService.updateProject(this.project.id, project).subscribe({
        next: (x) => {
          this.ref.close();
          window.location.reload();
        }, error: e => {
          if (e.error.errors) {
            this.message = e.error.errors[0];
          } else {
            this.message = e.error.detail;
          }
        },
      });
    }
  }
  
}
