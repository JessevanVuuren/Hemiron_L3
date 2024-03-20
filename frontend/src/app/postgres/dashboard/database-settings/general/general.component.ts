import {Component, OnInit} from '@angular/core';
import {Database} from "../../../models/database.model";
import {PostgresService} from "../../../postgres.service";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  public db: Database = {} as Database;

  constructor(private postgresService: PostgresService) {
  }

  ngOnInit(): void {
    this.postgresService.getDatabaseSubject().subscribe((db: Database) => {
      this.db = db;
    });
  }
}
