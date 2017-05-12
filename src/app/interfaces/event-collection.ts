import {IEvent} from "./event";
export interface IEventCollection {
    commits: IEvent[],
    branches: IEvent[]
};
