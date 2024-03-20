export class CreateDatabase {
  public databaseName: string;
  public projectId: string;
  constructor(databaseName: string, projectId: string) {
    this.databaseName = databaseName;
    this.projectId = projectId;
  }
}
