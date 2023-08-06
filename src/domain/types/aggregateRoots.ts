import { PostInfo } from './valueObjects';

export type Post = {
    _tag: "draft-post",
    id: string;
    postInfo: PostInfo;
    createdBy: string;
    tenantId: string;
}
