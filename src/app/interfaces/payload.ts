import {ICommit} from "./commit";

export interface IPayload {
    before: string;
    commits: ICommit[];
    distinct_size: number;
    head: string;
    push_id: number;
    ref: string;
    size: number;
};
