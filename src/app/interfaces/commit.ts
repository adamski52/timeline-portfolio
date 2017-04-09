import {IAuthor} from "./author";

export interface ICommit {
    author: IAuthor;
    distinct: boolean;
    message: string;
    sha: string;
    url: string;
};
