import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ProjectService } from 'src/app/project/services/project.service';
import {ErrorCode} from 'src/app/serverless/data/function.data';
import {FunctionService} from 'src/app/serverless/services/function.service';
import {fileExtensionValidator, functionNameValidator} from 'src/app/serverless/validators/validators';

@Component({
    selector: 'app-create-function',
    templateUrl: './create-function.component.html',
    styleUrls: ['./create-function.component.scss']
})
export class CreateFunctionComponent implements OnInit {
    form!: UntypedFormGroup;
    files: { [key: string]: File } = {};
    hasError: boolean = false;
    error!: ErrorCode;
    fileContent = '';
    projectId: string | undefined;

    constructor(private service: FunctionService, private projectService: ProjectService, private router: Router, public route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.projectId = this.projectService.currentProject?.id;
        this.form = new UntypedFormGroup({
            projectId: new UntypedFormControl(''),
            name: new UntypedFormControl('', [Validators.required, functionNameValidator()]),
            language: new UntypedFormControl('python'),
            handler: new UntypedFormControl(null, [fileExtensionValidator('py')]),
            requirements: new UntypedFormControl(null, [fileExtensionValidator('txt')])
        });
    }

    handleSubmit(): void {
        // Check if the form is valid
        if (this.form.valid && this.files['handler'] != undefined) {
            let formData = new FormData();
            if (this.projectId) formData.append('projectId', this.projectId);
            formData.append('name', this.form.get('name')?.value);
            formData.append('language', 'PYTHON');
            for (let key in this.files) {
                formData.append('files', this.files[key]);
            }

            this.service.create(formData).subscribe({
                next: (res) => {
                    this.router.navigate(['../', res.functionId], {relativeTo: this.route});
                },
                error: (err) => {
                    this.hasError = true;
                    this.error = err.error;
                }
            });
        } else {
            this.hasError = true;
            this.error = this.generateErrorMessage();
        }
    }

    generateErrorMessage(): ErrorCode {
        const errors: ErrorCode[] = [];

        if (this.form.get('name')?.hasError('required')) {
            errors.push({
                code: 'NAME_REQUIRED',
                description: 'Function name is required.'
            });
        }

        if (this.files['handler'] == null || this.files['handler'] == undefined) {
            errors.push({
                code: 'HANDLER_REQUIRED',
                description: 'Function file (.py) is required.'
            });
        } else if (this.form.get('handler')?.hasError('invalidExt')) {
            errors.push({
                code: 'INVALID_HANDLER_EXT',
                description: 'Function file must be a .py file.'
            });
        }
        if (this.form.get('requirements')?.hasError('invalidExt')) {
            errors.push({
                code: 'INVALID_REQUIREMENTS_EXT',
                description: 'Requirements file must be a .txt file.'
            });
        }

        return errors.length > 0 ? errors[0] : {
            code: 'FORM_INVALID',
            description: 'There was an error with the form. Please review your inputs and try again.'
        };
    }

    onFileChange(event: any, field: any) {
        this.files[field] = event.target.files[0];

        if (this.files[field].name.endsWith('.py')) {
            this.files[field].text().then((text: any) => {
                this.fileContent = text;
            })
        }

    }

    replaceFileContent(content: string) {
        this.fileContent = content;

        for (let key in this.files) {
            if (this.files[key].name.endsWith('.txt')) {
                return;
            }
            if (this.files[key].name.endsWith('.py')) {
                this.files[key] = new File([this.fileContent], "handler.py", {type: this.files[key].type});
                return;
            }
        }
        this.files['handler'] = new File([this.fileContent], "handler.py", {type: "text/x-python"});
    }
}
