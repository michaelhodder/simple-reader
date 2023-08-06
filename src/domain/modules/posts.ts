import { Post } from "../types/aggregateRoots";
import { PostInfo } from '../types/valueObjects';

export const mkPost = (id: string, createdBy: string, postInfo: PostInfo, tenantId: string): Post {
    return {
        _tag: "draft-post",
        id,
        createdBy,
        postInfo,
        tenantId
    }
}