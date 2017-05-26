export interface IBlog {
    kind: string;
    id: string;
    blog: {
        id: string;
    };
    published: Date;
    updated: Date;
    etag: string;
    url: string;
    selfLink: string;
    title: string;
    content: string;
    author: {
        id: string;
        displayName: string;
        url: string;
        image: {
            url: string;
        };
    };
    replies: {
        totalItems: string;
        selfLink: string;
    };
    $$type: string;
    $$isHidden: boolean;
    $$isEven: boolean;
};
