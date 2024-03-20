import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() items: { [key: string]: string } = {};
  @Output() select: EventEmitter<string> = new EventEmitter<string>();

  public visible: boolean = false;
  public render: boolean = false;

  private timeout: number | undefined;

  ngOnInit() {}

  @HostListener('document:click')
  private documentOnClick() {
    this.visible && this.hide();
  }

  public getItemEntries(): [string, string][] {
    return Object.entries(this.items);
  }

  public show(): void {
    this.destroyTimeout();

    this.render = true;
    this.timeout = setTimeout(() => {
      this.visible = true;
    }) // Make sure component is rendered before transitions are played
  }

  public hide(): void {
    this.destroyTimeout();

    this.visible = false;
    this.timeout = setTimeout(() => {
      this.render = false;
    }, 150) as unknown as number;
  }

  private destroyTimeout(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }
}
