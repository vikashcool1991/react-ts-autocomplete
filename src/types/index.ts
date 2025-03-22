import React from "react";

export type ChangeEventType = React.ChangeEvent<HTMLInputElement>;

export type MouseEventType = React.MouseEvent<HTMLLIElement, MouseEvent>;

export type QueryFunction<T> = () => Promise<T>;

export type FetchSuggestionResponseType = Promise<string[]>;
