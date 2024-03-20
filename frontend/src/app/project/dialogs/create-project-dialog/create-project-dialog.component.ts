import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { ProjectService } from "../../services/project.service";
import { Project } from "../../models/project";
import { CreateProject } from "../../models/create-project";

@Component({
  selector: "app-create-project-dialog",
  templateUrl: "./create-project-dialog.component.html",
  styleUrl: "./create-project-dialog.component.scss",
})
export class CreateProjectDialogComponent {
  projectForm = this.formBuilder.group({
    name: ["", { validators: [Validators.pattern(/^[a-zA-Z0-9 _'-]+$/), Validators.required, Validators.minLength(3), Validators.maxLength(32)], updateOn: 'blur' }],
    description: ["", { validators: [Validators.maxLength(255)], updateOn: 'blur' }], 
  });
  message: string = "";
  
  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private ref: DynamicDialogRef
  ) {}

  onSubmit() {
    if (this.projectForm.invalid) {
      return
    }
    
    const name = this.projectForm.value.name;
    const description = this.projectForm.value.description ? this.projectForm.value.description : '';

    if (name) {
      const project: CreateProject = {
        name: name,
        description: description,
      };
      this.projectService.createProject(project).subscribe({
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
