import { ServiceCategory } from "../models/service-category";

export const ServiceCatalog: ServiceCategory[] = [
    {
        name: "Computing",
        description: "Draai virtuele machines en containers",
        iconClass: "fas fa-robot",
        services: [
            {
                name: "VPS",
                url: "vps",
                description: "Virtuele Machines",
                iconClass: "fas fa-server",
            },
            {
                name: "Kubernetes",
                url: "kubernetes",
                description: "Managed draaien van docker containers",
                iconClass: "fas fa-cubes",
            },
            {
                name: "Serverless",
                url: "serverless",
                description: "",
                iconClass: "fas fa-subscript",
            },
        ],
    },
    {
        name: "Storage",
        description: "Bewaar bestanden en data voor lange of korte termijn",
        iconClass: "fas fa-warehouse",
        services: [
            {
                name: "Database",
                url: "postgres",
                description: "Een relationele database voor gebruik in projecten",
                iconClass: "fas fa-database",
            },
            {
                name: "Blob Storage",
                url: "s3",
                description: "Object storage voor het opslaan van bestanden en folders",
                iconClass: "fas fa-folder",
            },
        ],
    },
    {
        name: "Management",
        description: "Beheer het project intern",
        iconClass: "fas fa-list-check",
        services: [
            {
                name: "Billing",
                url: "billing",
                description: "Overzicht van computing kosten en data gebruik per resource",
                iconClass: "fas fa-wallet",
            },
        ],
    },
]