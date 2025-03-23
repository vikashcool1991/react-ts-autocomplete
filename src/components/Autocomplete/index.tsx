import React, { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import InputSearch from "../InputSearch";
import { ChangeEventType, MouseEventType } from "../../types";
import fetchTodoSuggestions from "../../requests/fetchTodoSuggestions";
import useQuery from "../../hooks/useQuery";
import useClickAway from "../../hooks/useClickAway";
import { SEARCH_TODOS_PLACEHOLDER } from "../../constants/autocomplete";
import { useTodosDispatch } from "../../providers/todos";
import { setFetchTodos } from "../../providers/todos/actions";
import SuggestionsList from "./SuggestionsList";
import "./styles.css";

const AutoComplete: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const ref = useClickAway<HTMLDivElement>(() => setShowSuggestions(false));
  const debouncedInputValue = useDebounce(inputValue, 500);
  const dispatch = useTodosDispatch();

  const { data, isFetching, error } = useQuery(
    fetchTodoSuggestions(debouncedInputValue),
    [debouncedInputValue],
    { enabled: selected !== inputValue && !!inputValue }
  );

  useEffect(() => {
    if (data) {
      setSuggestions(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setSuggestions([]);
    }
  }, [error]);

  const handleChange = (event: ChangeEventType) => {
    setInputValue(event.target.value);
    setShowSuggestions(true);
  };

  const onClear = () => {
    setInputValue("");
    setSelected("");
    setShowSuggestions(false);
  };

  const onFocus = () => {
    if (inputValue !== selected && inputValue) {
      setShowSuggestions(true);
    }
  };

  const onEnter = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      dispatch?.(setFetchTodos(inputValue, true));
    }
  };

  const onSuggestionSelect = (
    _event: MouseEventType | React.KeyboardEvent<HTMLLIElement>,
    selectedSuggestion: string
  ) => {
    setInputValue(selectedSuggestion);
    setShowSuggestions(false);
    setSelected(selectedSuggestion);
    dispatch?.(setFetchTodos(selectedSuggestion, true));
    // document.querySelector("input")?.focus(); // Move focus back to the input
  };

  return (
    <div
      className="autoComplete"
      ref={ref}
      role="combobox"
      aria-expanded={showSuggestions}
      aria-owns="suggestions-list"
      aria-haspopup="listbox"
    >
      <InputSearch
        placeholder={SEARCH_TODOS_PLACEHOLDER}
        onChange={handleChange}
        value={inputValue}
        onClear={onClear}
        onFocus={onFocus}
        onEnter={onEnter}
      />
      <SuggestionsList
        isFetching={isFetching}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        onSuggestionSelect={onSuggestionSelect}
        inputValue={inputValue}
        error={error}
      />
    </div>
  );
};

export default AutoComplete;
