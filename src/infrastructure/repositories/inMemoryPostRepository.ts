import * as RTE from 'fp-ts/ReaderTaskEither';
import * as O from 'fp-ts/Option';
import { Post } from "../../domain/types/aggregateRoots";
import { PostRepository } from '../../domain/types/repositories';
import { Context } from '../../shared/context';
import { pipe } from 'fp-ts/lib/function';

const byId: Record<string, Post> = {};

const create = (post: Post): RTE.ReaderTaskEither<Context, Error, void> =>
    pipe(
        O.fromNullable(byId[post.id]),
        O.fold(
            () => {
                byId[post.id] = post;
                return RTE.right(undefined);
            },
            (_) => RTE.left(new Error("Primary key already exists"))
        )
    )

const getById = (id: string): RTE.ReaderTaskEither<Context, Error, O.Option<Post>> =>
    pipe(
        RTE.ask<Context>(),
        RTE.map(({ tenantId }) =>
            pipe(
                O.fromNullable(byId[id]),
                O.filter((post) => post.tenantId === tenantId),
            )
        )
    )

const update = (post: Post): RTE.ReaderTaskEither<Context, Error, void> => 
    pipe(
        RTE.ask<Context>(),
        RTE.chain(({ tenantId }) => 
            pipe(
                O.fromNullable(byId[post.id]),
                O.filter((post) => post.tenantId === tenantId),
                O.fold(
                    () => RTE.left(new Error("No post exists with that id")),
                    (_) => {
                        byId[post.id] = post;
                        return RTE.right(undefined);
                    }
                )
            )
        )
    )

const _delete = (id: string): RTE.ReaderTaskEither<Context, Error, void> => 
    pipe(
        RTE.ask<Context>(),
        RTE.chain(({ tenantId }) => 
            pipe(
                O.fromNullable(byId[id]),
                O.filter((post) => post.tenantId === tenantId),
                O.fold(
                    () => RTE.left(new Error("No post exists with that id")),
                    (_) => {
                        delete byId[id];
                        return RTE.right(undefined);
                    }
                )
            )
        )

    )

export const inMemoryPostRepository: PostRepository = {
    create,
    getById,
    update,
    delete: _delete
}