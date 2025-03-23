import React, { ReactNode } from "react";

export interface InputSearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onClear: () => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface UseQueryResult<T> {
  data: T | null;
  error: Error | null;
  isFetching: boolean;
  refetch: () => void;
}

export interface ITodo {
  userId?: number;
  id?: number;
  title?: string;
  completed?: boolean;
}

export interface ITodosState {
  todos?: ITodo[];
  shouldFetch?: boolean;
  searchText?: string;
}

export interface ITodosAction {
  type: string;
  shouldFetch?: boolean;
  todos?: ITodo[];
  searchText?: string;
}

export interface ITodosProviderProps {
  children: ReactNode;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export interface ISuggestionsListProps {
  isFetching: boolean;
  suggestions: string[];
  showSuggestions: boolean;
  onSuggestionSelect: (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
    suggestion: string
  ) => void;
  inputValue: string;
  error: Error | null;
}
