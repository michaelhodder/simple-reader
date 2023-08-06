import * as RTE from 'fp-ts/ReaderTaskEither';
import * as uuid from 'uuid';
import { RequestHandler } from "express";
import { CreatePostCommandHandler } from "../../../application/commandHandlers/createPostCommandHandler";
import { pipe } from "fp-ts/lib/function";
import { CreatePostCommand } from "../../../domain/types/commands";
import { Context } from '../../../shared/context';

export const post = (createPostCommandHandler: CreatePostCommandHandler): RequestHandler => async (req, res, next) => {
    const context: Context = {
        correlationId: uuid.v4(),
        userId: uuid.v4(),
        tenantId: uuid.v4(),
    }
    
    const cmd: CreatePostCommand = {
        description: req.body
    }
    
    const handler = pipe(
        createPostCommandHandler(cmd),
        RTE.match(
            (e) => next(e),
            (id) => {
                res.status(201).send({
                    id
                })
            }
        )
    )

    await handler(context)();
}