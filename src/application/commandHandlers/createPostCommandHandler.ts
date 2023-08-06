import * as RTE from 'fp-ts/ReaderTaskEither';
import * as uuid from 'uuid';
import { PostRepository } from '../../domain/types/repositories';
import { pipe } from 'fp-ts/lib/function';
import { CreatePostCommand } from '../../domain/types/commands';
import * as PostInfo from '../../domain/modules/postInfo';
import { mkPost } from '../../domain/modules/posts';
import { Context } from '../../shared/context';

export const createPostCommandHandler = 
    (postRepository: PostRepository) =>
    (cmd: CreatePostCommand): RTE.ReaderTaskEither<Context, Error, string> =>
    pipe(
        RTE.Do,
        RTE.let('id', () => uuid.v4()),
        RTE.bind('postInfo', () => RTE.fromEither(PostInfo.mkPostInfo(cmd.description))),
        // TODO: Work out how to get userId and tenantId here
        RTE.let('post', ({ id, postInfo }) => mkPost(id, "", postInfo, "")),
        RTE.chainFirst(({ post }) => postRepository.create(post)),
        RTE.map(({ post }) => post.id)
    )

export type CreatePostCommandHandler = (cmd: CreatePostCommand) => RTE.ReaderTaskEither<Context, Error, string>;