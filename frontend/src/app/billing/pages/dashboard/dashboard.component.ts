import { Component } from '@angular/core';
import { ActionService } from '../../services/action.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

	constructor(public actionService: ActionService) {
	}

}
