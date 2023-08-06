import * as RTE from 'fp-ts/ReaderTaskEither';
import { GetPostQuery } from '../../domain/types/queries';
import { pipe } from 'fp-ts/lib/function';
import { Post } from '../../domain/types/aggregateRoots';
import { PostRepository } from '../../domain/types/repositories';
import { Context } from '../../shared/context';

export const getPostQueryHandler = (postRepository: PostRepository) => (query: GetPostQuery): RTE.ReaderTaskEither<Context, Error, Post> =>
    pipe(
        postRepository.getById(query.id),
        RTE.chainW(RTE.fromOption(() => new Error("Post not found")))
    )

export type GetPostQueryHandler = (query: GetPostQuery) => RTE.ReaderTaskEither<Context, Error, Post>;