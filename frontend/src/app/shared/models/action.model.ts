export type Action = {
    id: string;
    cpuUsage: number;
    ioUsage: number;
    storage: number;
    networkTraffic: number;
    service: string;
    performedAt: Date;
    [key: string]: any;
};
