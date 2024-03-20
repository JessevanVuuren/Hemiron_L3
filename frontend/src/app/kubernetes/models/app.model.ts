import { Cluster } from './cluster.model'

export type App = {
    chartName: string,
    chartVersion: string,
    created: string,
    description: string,
    name: string,
    repositoryUrl: string,
    status: string,
    values: string,
    cluster: Cluster,
}