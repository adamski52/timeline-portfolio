export interface IError {
    description: string;
    type: number;
    id?: number;
};

export const ErrorTypes = {
    UNKNOWN: 0
};
