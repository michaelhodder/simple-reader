import * as E from 'fp-ts/Either';
import { PostInfo, Description } from '../types/valueObjects';
import { pipe } from 'fp-ts/lib/function';

const mkDescription = (description: string): E.Either<Error, Description> => {
    if (description.length > 255) {
        return E.left(new Error("Description must be less than 255 characters"));
    }
    else {
        return E.right({ _tag: "description", value: description })
    }
}

export const mkPostInfo = (description: string): E.Either<Error, PostInfo> => {
    return pipe(
        mkDescription(description),
        E.map((description) => ({
            _tag: "post-info",
            description
        }))
    )
}