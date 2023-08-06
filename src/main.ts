import express from 'express';
import { inMemoryPostRepository  } from './infrastructure/repositories/inMemoryClaimRepository';
import { createPostCommandHandler } from './application/commandHandlers/createPostCommandHandler';
import { getPostQueryHandler } from './application/queryHandlers/getPostQueryHandler';
import { routes } from './api/routes';

(async function() {
    const config = { port: 8080 }

    const app = express();

    const _createPostCommandHandler = createPostCommandHandler(inMemoryPostRepository);
    const _getPostQueryHandler = getPostQueryHandler(inMemoryPostRepository);

    app.use("/posts")
        .get("/", routes.posts.get(_getPostQueryHandler))
        .post("/", routes.posts.post(_createPostCommandHandler))

    app.listen(config.port, () => {
        console.log(`Listening on port ${config.port}`)
    })
})()