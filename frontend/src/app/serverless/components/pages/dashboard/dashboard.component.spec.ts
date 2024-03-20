import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FunctionService } from 'src/app/serverless/services/function.service';
import { Observable, of } from 'rxjs';
import { GetFunctionResponse } from 'src/app/serverless/data/function.data';

const mockFunctions: GetFunctionResponse[] = [];

class MockFunctionService {
    getAll(): Observable<GetFunctionResponse[]> {
        return of(mockFunctions);
    }
}

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [DashboardComponent],
            providers: [
                { provide: FunctionService, useClass: MockFunctionService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
