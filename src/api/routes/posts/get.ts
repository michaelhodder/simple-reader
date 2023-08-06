import * as RTE from 'fp-ts/ReaderTaskEither';
import * as uuid from 'uuid';
import { RequestHandler } from "express";
import { GetPostQueryHandler } from "../../../application/queryHandlers/getPostQueryHandler";
import { pipe } from "fp-ts/lib/function";
import { GetPostQuery } from "../../../domain/types/queries";
import { Context } from '../../../shared/context';

export const get = (getPostQueryHandler: GetPostQueryHandler): RequestHandler => async (req, res, next) => {
    const context: Context = {
        correlationId: uuid.v4(),
        userId: uuid.v4(),
        tenantId: uuid.v4(),
    }

    const query: GetPostQuery = {
        id: req.params.id
    }

    const handler = pipe(
        getPostQueryHandler(query),
        RTE.match(
            (e) => next(e),
            (post) => {
                res.status(201).send(post)
            }
        )
    )

    await handler(context)();
}

