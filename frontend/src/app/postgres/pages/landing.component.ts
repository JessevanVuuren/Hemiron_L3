import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DbPlan} from "../models/dbPlan";
import {environment} from "../../../environments/environment";
import {ConfigService} from "../services/ConfigService";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  public products!: DbPlan[];
  constructor(private configService: ConfigService) {}
  ngOnInit(): void {
    this.configService.getConfigBilling().subscribe(config => {
      environment.billingURL = config;
    })
    this.configService.getConfigPostgres().subscribe(config => {
      environment.postgresURL = config;
    })
  }
}
