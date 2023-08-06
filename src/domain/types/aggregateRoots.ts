import { PostInfo } from './valueObjects';

export type Post = {
    _tag: "post",
    id: string;
    postInfo: PostInfo;
    createdBy: string;
    tenantId: string;
}
