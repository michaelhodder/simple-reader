export type Description = {
    _tag: "description";
    value: string;
}

export type PostInfo = {
    _tag: "post-info";
    description: Description;
}