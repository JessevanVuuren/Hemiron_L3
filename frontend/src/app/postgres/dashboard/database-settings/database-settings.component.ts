import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Database} from "../../models/database.model";
import {PostgresService} from "../../postgres.service";

@Component({
  selector: 'app-database-settings',
  templateUrl: './database-settings.component.html',
  styleUrls: ['./database-settings.component.scss']
})
export class DatabaseSettingsComponent implements OnInit {

  public db: Database = {} as Database
  private UUID: string = '';

  constructor(private route: ActivatedRoute, private postgresService: PostgresService) {
    this.route.params.subscribe(params => {
      this.UUID = params['UUID'];
    });
  }

  ngOnInit(): void {
    this.postgresService.getDatabaseByUUID(this.UUID).subscribe((db: Database) => {
      this.db = db;
    });
  }

}
