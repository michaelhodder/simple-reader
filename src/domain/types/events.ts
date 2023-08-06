import { PostInfo } from './valueObjects';

export enum EventType {
    PostCreated = 'post-created'
}

export type PostCreatedEvent = {
    type: EventType.PostCreated;
    aggregateId: string;
    postInfo: PostInfo;
    createdBy: string;
    tenantId: string;
}