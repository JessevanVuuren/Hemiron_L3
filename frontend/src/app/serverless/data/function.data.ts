export interface CreateFunctionRequest {
    projectId: string,
    name: string,
    language: LanguageType,
    files: File[]
}

export interface GetFunctionResponse {
    id: string,
    name: string,
    projectId: string,
    language: LanguageType,
    functionUrl: string
}

export interface GetFunctionByIdResponse {
    id: string,
    name: string,
    projectId: string,
    language: LanguageType,
    functionUrl: string,
    faas: GetFunctionByIdOpenFaasResponse,
    tasks: GetFunctionByIdTaskResponse[]
}

export interface GetFunctionByIdOpenFaasResponse {
    invocationCount: number,
    replicas: number,
    availableReplicas: number
}

export interface GetFunctionByIdTaskResponse {
    id: string,
    createdAt: string,
    type: TaskType,
    resolution: TaskResolutionType,
}

export interface CreateTaskResponse {
    taskId: string,
    functionId: string
}


export interface ErrorCode {
    code: string,
    description: string
}

export enum LanguageType {
    PYTHON = "PYTHON"
}

export enum TaskType {
    CREATE,
    DELETE,
    UPDATE
}

export enum TaskResolutionType {
    PENDING,
    FAILED,
    COMPLETED
}
