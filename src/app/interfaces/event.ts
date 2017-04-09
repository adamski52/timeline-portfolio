import {IActor} from "./actor";
import {IPayload} from "./payload";
import {IRepo} from "./repo";

export interface IEvent {
    actor: IActor;
    created_at: Date|string;
    id: string;
    payload: IPayload;
    public: true;
    repo: IRepo;
    type: string;
};
