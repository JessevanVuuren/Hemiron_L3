import {ComponentFixture, TestBed} from '@angular/core/testing';
import { CodeEditorComponent } from './code-editor.component';

describe('CodeEditorComponent', () => {
  let component: CodeEditorComponent;
  let fixture: ComponentFixture<CodeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize ACE editor with correct settings', (done: DoneFn) => {
    fixture.detectChanges();

    setTimeout(() => {
      fixture.detectChanges();

      expect(component.editor).toBeTruthy();
      const editorOptions = component.editor.getOptions();
      expect(editorOptions['fontSize']).toBe('14pt');
      expect(editorOptions['fontFamily']).toBe('monospace');
      expect(editorOptions['tabSize']).toBe(4);
      expect(editorOptions['highlightActiveLine']).toBeTrue();

      const mode = component.editor.getSession() as any;
      expect(mode['$modeId']).toBe('ace/mode/python');
      done();
    }, 1000);
  });

  it('should update editor content when fileContent input changes', () => {
    const newContent = 'print("Hello, World!")';
    component.fileContent = newContent;
    fixture.detectChanges();

    expect(component.editor.getValue()).toEqual(newContent);
  });

  it('should emit fileContentChange event when Upload button is clicked', () => {
    spyOn(component.fileContentChange, 'emit');
    const newContent = 'print("Hello again!")';
    component.editor.setValue(newContent);
    fixture.detectChanges();

    const uploadButton = fixture.debugElement.nativeElement.querySelector('button');
    uploadButton.click();
    fixture.detectChanges();

    expect(component.fileContentChange.emit).toHaveBeenCalledWith(newContent);
  });

  it('should update codeChanged flag on editor content change', () => {
    const initialContent = 'initial content';
    const newContent = 'new content';

    component.fileContent = initialContent;
    fixture.detectChanges();

    component.editor.setValue(newContent);
    fixture.detectChanges();

    expect(component.codeChanged).toBeTrue();
  });

  it('should update lastSubmittedCode and reset codeChanged on submit', () => {
    const submitContent = 'submit content';
    component.editor.setValue(submitContent);
    fixture.detectChanges();

    component.onSubmit();
    expect(component.lastSubmittedCode).toBe(submitContent);
    expect(component.codeChanged).toBeFalse();
  });
});
