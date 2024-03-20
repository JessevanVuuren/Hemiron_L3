import {Component, OnInit} from '@angular/core';
import {Database} from "../models/database.model";
import {PostgresService} from "../postgres.service"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public databaseList: Array<Database>;

  constructor(private postgresService: PostgresService) {
    this.databaseList = new Array<Database>();
  }

  ngOnInit(): void {
    this.postgresService.getAllDatabases().subscribe((data: Database[]) => {
      this.databaseList = data;
    });
  }

  public getStatusColor(status: String) {
    if (status === 'ACTIVE') {
      return 'green';
    } else if (status === 'STOPPED') {
      return 'red';
    } else {
      return 'yellow';
    }
  }

}
