import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as ace from 'ace-builds';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent {
  @Input() set fileContent(content: string) {
    if (this.editor) {
      this.settingValue = true;
      this.editor.setValue(content, -1);
      this.settingValue = false;
    }
  }
  @Output() fileContentChange = new EventEmitter<string>();

  editor!: ace.Ace.Editor;
  code = '';
  codeChanged = false;
  lastSubmittedCode = '';
  settingValue = false;

  ngAfterViewInit() {
    ace.config.set('basePath', 'assets/ace-builds/src-noconflict');
    this.editor = ace.edit('editor');
    this.editor.session.setMode('ace/mode/python');
    this.editor.setShowPrintMargin(false);
    this.editor.setOptions({
      fontSize: '14pt',
      fontFamily: 'monospace',
      tabSize: 4,
      highlightActiveLine: true,
    });
    this.editor.on('change', () => {
      if (this.settingValue) {
        return;
      }
      this.code = this.editor.getValue();
      this.codeChanged = this.code !== this.lastSubmittedCode;
    });
  }

  onSubmit() {
    this.lastSubmittedCode = this.code;
    this.codeChanged = false;
    this.fileContentChange.emit(this.code);
  }
}
