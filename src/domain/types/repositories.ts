import * as RTE from 'fp-ts/ReaderTaskEither';
import * as O from 'fp-ts/Option';
import { Post } from './aggregateRoots';
import { Context } from '../../shared/context';

type Repository<A> = {
    create: (a: A) => RTE.ReaderTaskEither<Context, Error, void>;
    getById: (id: string) => RTE.ReaderTaskEither<Context, Error, O.Option<A>>;
    update: (a: A) => RTE.ReaderTaskEither<Context, Error, void>;
    delete: (id: string) => RTE.ReaderTaskEither<Context, Error, void>;
}

export type PostRepository = Repository<Post>;