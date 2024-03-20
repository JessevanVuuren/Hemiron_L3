import { App } from './app.model';

export type Cluster = {
    id: string,
    name: string,
    version: string,
    status: string,
    created: string,
    kubeConfig: string,
    helmApps: App[],
  }
  