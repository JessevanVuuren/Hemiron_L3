import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { HelmAppService } from "../../services/helm-app.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { VerifyChartDto } from "../../models/verify-chart-dto.model";
import { AppDto } from "../../models/app-dto.model";
import { ConfirmationService, MessageService } from "primeng/api";
import { ProjectService } from "src/app/project/services/project.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Template } from "../../models/template.model";
import { TemplateService } from "../../services/template.service";
import { debounceTime, filter, from } from "rxjs";
import { InputComponent } from "../../components/input/input.component";

@Component({
  selector: "app-add-helm-app",
  templateUrl: "./add-helm-app.component.html",
  styleUrl: "./add-helm-app.component.scss",
})
export class AddHelmAppComponent implements OnInit {

  @ViewChildren(InputComponent) inputComponents!: QueryList<InputComponent>;

  constructor(
    private helmAppService: HelmAppService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private projectService: ProjectService,
    private aRoute: ActivatedRoute,
    private templateService: TemplateService,
    private router: Router
  ) {
    this.clusterId = this.aRoute.snapshot.paramMap.get("clusterId");
  }

  protected addClusterForm!: FormGroup;

  private clusterId: string | null;

  protected chartIsInvalid!: boolean;

  protected templateOptions: any[] = [];
  protected selectedTemplate!: Template;

  private createForm(): void {
    this.addClusterForm = this.formBuilder.group({
      template: [""],
      appName: ["", [Validators.required, Validators.minLength(1)]],
      description: [""],
      repositoryUrl: ["", [Validators.required, Validators.minLength(1)]],
      chartName: ["", [Validators.required, Validators.minLength(1)]],
      chartVersion: ["", [Validators.required, Validators.minLength(1)]],
    });
  }

  private resetEditorOnNavigate(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.helmAppService.resetEditor();
      });
  }

  private loadTemplate(): void {
    this.addClusterForm.get("template")?.valueChanges.pipe(debounceTime(100)).subscribe(
      (selectedTemplate: Template) => {
        if (selectedTemplate) {
          this.getHelmAppService().setYamlContent(selectedTemplate.values);
          const formValues: any = {
            appName: selectedTemplate.name,
            description: selectedTemplate.description,
            repositoryUrl: selectedTemplate.repositoryUrl,
            chartName: selectedTemplate.chartName,
            chartVersion: selectedTemplate.chartVersion,
          };
          this.addClusterForm.patchValue(formValues)

          const formControlNames = Object.keys(this.addClusterForm.controls).filter(
            (controlName) => controlName !== "template");
            this.inputComponents.forEach((inputComponent, index) => {

            const formControlName = formControlNames[index];

            if (formControlName !== "template") {
              const formControlValue = formValues[formControlName];
              inputComponent.writeValue(formControlValue);
            }
          });
        } 
      });
  }

  ngOnInit(): void {

    this.helmAppService.chartIsInvalid$.subscribe((value) => {
      this.chartIsInvalid = value;
    });

    from(this.templateService.getAllTemplates()).subscribe((templates) => {
      this.templateOptions = templates;
    });

    this.resetEditorOnNavigate();
    this.createForm();
    this.loadTemplate();
  }

  public getTemplateOptions(): {}[] {
    return this.templateOptions.map((template) => ({ name: template.name }));
  }

  public getHelmAppService(): HelmAppService {
    return this.helmAppService;
  }

  public resetForm() {
    this.addClusterForm.reset();
    this.addClusterForm.get("template")?.patchValue("")
    this.inputComponents.forEach((inputComponent) => {
        inputComponent.writeValue("");
    });
    this.getHelmAppService().resetEditor();
  }

  public removeFormValues(event: Event) {
    this.confirmationService.confirm({
      key: "removeFormValues",
      acceptLabel: "Alles wissen",
      rejectLabel: "Terug",
      header: "Bevestiging",
      message: "Weet u zeker dat u alle ingevoerde velden wilt wissen?",
      accept: () => {
        this.resetForm();
      },
      reject: () => {},
    });
  }

  public async createHelmApp() {
    const appDto: AppDto = {
      name: this.addClusterForm.value.appName,
      description: this.addClusterForm.value.description,
      repositoryUrl: this.addClusterForm.value.repositoryUrl,
      chartName: this.addClusterForm.value.chartName,
      chartVersion: this.addClusterForm.value.chartVersion,
      values: this.getHelmAppService().getYamlContent(),
    };

    if (this.projectService.currentProject?.id) {
      (
        await this.helmAppService.createHelmApp(
          this.projectService.currentProject?.id,
          this.clusterId!,
          appDto
        )
      ).subscribe({
        next: () => {
          this.resetForm();
          this.helmAppService.resetEditor();
          this.messageService.add({
            key: "addHelmApp",
            severity: "info",
            summary: "We gaan aan de slag!",
            detail: "Uw app wordt nu toegevoegd aan uw cluster.",
          });
        },
        error: () => {
          this.messageService.add({
            key: "addHelmApp",
            severity: "error",
            summary: "Er is iets misgegaan bij het toevoegen van uw app",
            detail: "Probeer het later nog een keer.",
          });
        },
      });
    }
  }

  protected async verifyChart() {
    const verifyChartDto: VerifyChartDto = {
      repositoryUrl: this.addClusterForm.value.repositoryUrl,
      chartName: this.addClusterForm.value.chartName,
      chartVersion: this.addClusterForm.value.chartVersion,
      values: this.getHelmAppService().getYamlContent(),
    };
    (await this.helmAppService.verifyChart(verifyChartDto)).subscribe({
      next: () => {
        this.getHelmAppService().updateChartValidity(false);
        this.messageService.add({
          key: "verify",
          severity: "success",
          summary: "Chart geverifieerd!",
          detail: "U kunt nu uw app toevoegen aan uw cluster.",
        });
      },
      error: () => {
        this.getHelmAppService().updateChartValidity(true);
        this.messageService.add({
          key: "verify",
          severity: "error",
          summary: "Chart kon niet geverifieerd worden",
          detail:
            "Zorg ervoor dat de chart echt bestaat en dat uw .yaml bestand correct is.",
        });
      },
    });
  }
}
