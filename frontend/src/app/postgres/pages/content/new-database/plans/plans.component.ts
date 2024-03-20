import { Component, OnInit } from '@angular/core';
import { DbPlan } from "../../../../models/dbPlan";
import { ApiUserService } from "../../../../services/api-user.service";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  dbPlanList: DbPlan[] = [];
  isButtonClicked: boolean | undefined;
  chosenProduct!: DbPlan;

  constructor(
    private apiUserService: ApiUserService
  ) {}

  public async ngOnInit(): Promise<void> {
    await this.getDatabaseProducts();
  }

  private async getDatabaseProducts(): Promise<void> {
    this.dbPlanList = await this.apiUserService.getDbPlanList();
  }

  public addToCart(product: DbPlan): void {
    this.chosenProduct = product;
  }
}
