export class DbPlan {
  public id: string;
  public name: string;
  public description: string;
  public service: string;
  public type: string;
  public cost: number;


  constructor(id: string, name: string, description: string, service: string, type: string, cost: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.service = service;
    this.type = type;
    this.cost = cost;
  }
}
