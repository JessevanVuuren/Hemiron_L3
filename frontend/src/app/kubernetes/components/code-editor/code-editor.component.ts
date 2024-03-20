import { Component, Input } from "@angular/core";
import { HelmAppService } from "../../services/helm-app.service";

@Component({
  selector: "app-code-editor",
  templateUrl: "./code-editor.component.html",
  styleUrl: "./code-editor.component.scss",
})
export class CodeEditorComponent {
  editorOptions = {
    theme: 'vs-dark', 
    language: 'yaml'
  };

  constructor(private helmAppService: HelmAppService) {};

  @Input() public code!: string;

  public onChange(event: string): void {
    this.helmAppService.setYamlContent(event);
    this.helmAppService.updateChartValidity(true);
  }
}