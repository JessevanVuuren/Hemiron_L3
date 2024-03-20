import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DarkModeToggleButtonComponent } from './dark-mode-toggle-button.component';
import {ThemeService} from "../../services/theme.service";

class MockThemeService {
  getCurrentTheme() {
    return 'mock-theme';
  }
}

describe('DarkModeToggleButtonComponent', () => {
  let component: DarkModeToggleButtonComponent;
  let fixture: ComponentFixture<DarkModeToggleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DarkModeToggleButtonComponent],
      providers: [{ provide: ThemeService, useClass: MockThemeService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarkModeToggleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
