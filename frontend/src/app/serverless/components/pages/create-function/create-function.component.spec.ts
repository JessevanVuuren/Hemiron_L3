import {ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';
import {CreateFunctionComponent} from './create-function.component';
import {FunctionService} from 'src/app/serverless/services/function.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {of, throwError} from 'rxjs';
import {CreateTaskResponse} from "../../../data/function.data";

describe('CreateFunctionComponent', () => {
    let component: CreateFunctionComponent;
    let fixture: ComponentFixture<CreateFunctionComponent>;
    let functionService: FunctionService;
    let router: Router;

    beforeEach(async () => {
        const functionServiceStub = {
            create: () => of({ functionId: '12345' })
        };

        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                ReactiveFormsModule,
                FormsModule
            ],
            declarations: [CreateFunctionComponent],
            providers: [
                { provide: FunctionService, useValue: functionServiceStub },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: () => 'test_id',
                            },
                        },
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateFunctionComponent);
        component = fixture.componentInstance;
        functionService = TestBed.inject(FunctionService);
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form invalid when empty', () => {
        expect(component.form.valid).toBeFalsy();
    });

    it('name field validity', () => {
        let errors: any;
        let name = component.form.controls['name'];
        expect(name.valid).toBeFalsy();

        errors = name.errors || {};
        expect(errors['required']).toBeTruthy();

        name.setValue("testname");
        errors = name.errors || {};
        expect(errors['required']).toBeFalsy();
    });

    it('submitting a form calls function service and navigates', fakeAsync(() => {
        component.form.controls['name'].setValue("testname");
        component.files['handler'] = new File(['content'], 'handler.py', {type: 'text/plain'});

        spyOn(functionService, 'create').and.returnValue(of({
            taskId: 'someTaskId',
            functionId: '12345'
        } as CreateTaskResponse));
        const navigateSpy = spyOn(router, 'navigate');

        component.handleSubmit();
        tick();

        expect(functionService.create).toHaveBeenCalled();
        expect(navigateSpy).toHaveBeenCalledWith(['../', '12345'], { relativeTo: component.route });
    }));


    it('displays error when service fails', fakeAsync(() => {
        spyOn(functionService, 'create').and.returnValue(throwError(() => new Error('Service failed')));
        component.handleSubmit();
        tick();
        expect(component.hasError).toBeTrue();
        expect(component.error).toBeDefined();
    }));

    it('generates error message when form is invalid', () => {
        component.handleSubmit();
        expect(component.hasError).toBeTrue();

        expect(component.error.code).toBe('NAME_REQUIRED');
    });

    it('generates error message when handler file is not a python file', () => {
        component.form.controls['name'].setValue("testname");

        component.handleSubmit();
        expect(component.hasError).toBeTrue();

        expect(component.error.code).toBe('HANDLER_REQUIRED');
    });

    it('should handle file change for python files', fakeAsync(() => {
        const file = new File(['print("hello world")'], 'test.py', { type: 'text/plain' });
        const event = { target: { files: [file] } };
        component.onFileChange(event, 'handler');
        tick();
        flushMicrotasks();
        fixture.detectChanges();

        expect(component.files['handler']).toEqual(file);
    }));
});
