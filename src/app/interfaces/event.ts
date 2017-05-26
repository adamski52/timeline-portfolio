import {IActor} from "./actor";
import {IPayload} from "./payload";

export interface IEvent {
    actor: IActor;
    created_at: Date|string;
    id: string;
    payload: IPayload;
    public: true;
    repo: {
        id: number;
        name: string;
        url: string;
    };
    type: string;
    $$type: string;
    $$isHidden: boolean;
    $$isEven: boolean;
};
