import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { CommonHeaderComponent } from './common-header.component';
import {
    DarkModeToggleButtonComponent
} from "../../../settings/components/dark-mode-toggle-button/dark-mode-toggle-button.component";
import { ThemeService } from '../../../settings/services/theme.service';

describe('CommonHeaderComponent', () => {
    let component: CommonHeaderComponent;
    let fixture: ComponentFixture<CommonHeaderComponent>;
    let library: FaIconLibrary;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                ButtonModule,
                OverlayPanelModule,
                FontAwesomeModule,
            ],
            declarations: [CommonHeaderComponent, DarkModeToggleButtonComponent],
            providers: [
                {
                    provide: ThemeService,
                    useValue: {
                        getCurrentTheme: () => 'light'
                    }
                }
            ]
        }).compileComponents();

        library = TestBed.inject(FaIconLibrary);
        library.addIcons(faCircleQuestion);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CommonHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
