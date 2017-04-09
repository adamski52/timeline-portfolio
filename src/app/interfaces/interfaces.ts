export interface IError {
    description: string;
    type: number;
    id?: number;
};

export const ErrorTypes = {
    UNKNOWN: 0
};

export interface IThumbnail {

};

export interface ILanguage {
    name: string;
    iconClass: string;
    size?: number;
};

export interface ILanguageMeta {
    [key: string]: number;
};

export interface IActor {
    avatar_url: string;
    display_login: string;
    gravatar_id: string;
    id: number;
    login: string;
    url: string;
};

export interface IAuthor {
    email: string;
    name: string;
};

interface ICommit {
    author: IAuthor;
    distinct: boolean;
    message: string;
    sha: string;
    url: string;
};

export interface IPayload {
    before: string;
    commits: ICommit[];
    distinct_size: number;
    head: string;
    push_id: number;
    ref: string;
    size: number;
};

export interface IEvent {
    actor: IActor;
    created_at: Date|string;
    id: string;
    payload: IPayload;
    public: true;
    repo: IRepo;
    type: string;
};

export interface IPermissions {
    admin: boolean;
    pull: boolean;
    push: boolean;
};

export interface IRepo {
    archive_url: string;
    assignees_url: string;
    blobs_url: string;
    branches_url: string;
    clone_url: string;
    collaborators_url: string;
    comments_url: string;
    commits_url: string;
    compare_url: string;
    contents_url: string;
    contributors_url: string;
    created_at: Date|string;
    default_branch: string;
    deployments_url: string;
    description:string;
    downloads_url: string;
    events_url: string;
    fork: boolean;
    forks: number;
    forks_count: number;
    forks_url: string;
    full_name: string;
    git_commits_url: string;
    git_refs_url: string;
    git_tags_url: string;
    git_url: string;
    has_downloads: boolean;
    has_issues: boolean;
    has_pages: boolean;
    has_projects: boolean;
    has_wiki: boolean;
    homepage: string;
    hooks_url: string;
    html_url: string;
    id: number;
    issue_comment_url: string;
    issue_events_url: string;
    issues_url: string;
    keys_url: string;
    labels_url: string;
    language: string;
    languages_url: string;
    merges_url: string;
    milestones_url: string;
    mirror_url: string;
    name: string;
    notifications_url: string;
    open_issues: number;
    open_issues_count: number;
    owner: IUser;
    permissions: IPermissions;
    private: boolean;
    pulls_url: string;
    pushed_at: Date|string;
    releases_url: string;
    size: number;
    ssh_url: string;
    stargazers_count: number;
    stargazers_url: string;
    statuses_url: string;
    subscribers_url: string;
    subscription_url: string;
    svn_url: string;
    tags_url: string;
    teams_url: string;
    trees_url: string;
    updated_at: Date|string;
    url: string;
    watchers: number;
    watchers_count: number;
};

export interface IPlan {
    collaborators: number;
    name: string;
    private_repos: number;
    space: number;
};

export interface IUser {
    avatar_url: string;
    bio: string;
    blog: string;
    collaborators: number;
    company: string;
    created_at: Date|string;
    disk_usage: number;
    email: string;
    events_url: string;
    followers: number;
    followers_url: string;
    following: number;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    hireable: boolean;
    html_url: string;
    id: number;
    location: string;
    login: string;
    name: string;
    organizations_url: string;
    plan: IPlan;
    private_gists: number;
    public_gists: number;
    public_repos: number;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    total_private_repos: number;
    two_factor_authentication: boolean;
    type: string;
    updated_at: Date|string;
    url: string;
};

export interface ITimeline {
    user: IUser;
    repos: IRepo[];
    events: IEvent[];
};
