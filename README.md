# Autocomplete app for todos

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Scripts](#scripts)
- [Testing](#testing)
  - [Running Tests](#running-tests)
  - [Test Coverage](#test-coverage)
  - [Test Coverage Threshold](#test-coverage-threshold)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Accessibility (a11y)](#accessibility-a11y)
  - [General Accessibility Features](#general-accessibility-features)
  - [Component-Specific Accessibility Features](#component-specific-accessibility-features)
    - [Autocomplete](#autocomplete)
    - [Todos List](#todos-list)
    - [Input Search](#input-search)
  - [Accessibility Testing](#accessibility-testing)
- [API Integration](#api-integration)
- [Custom Hooks](#custom-hooks)
  - [useDebounce](#usedebounce)
  - [useClickAway](#useclickaway)
  - [useQuery](#usequery)
- [Edge Cases Handled](#edge-cases-handled)
- [Styling](#styling)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Overview

This project is a React TypeScript application that provides an autocomplete feature for managing a list of todos. This application designed to provide a smooth and efficient user experience. Users can type into an input field to search and select from a list of predefined todo items. The app highlights matching text, handles edge cases, and uses asynchronous data fetching to simulate real-world REST API calls.

## Features

- **Autocomplete Functionality**: Autocomplete functionality for todos. Provides suggestions as the user types.
- **Highlight Matching Text**: Highlights the part of the suggestion that matches the input.
- **Asynchronous Data Fetching**: Simulates REST API calls to fetch suggestions.
- **Error Handling**: Uses an `ErrorBoundary` to gracefully handle unexpected errors.
- **Debounced Input**: Reduces unnecessary API calls by debouncing user input.
- **Lazy Loading**: Optimizes performance by lazy-loading the main `App` component.
- **Pure React Implementation**: No third-party libraries are used for state management or UI components.
- Built with React and TypeScript for type safety and scalability.
- Modular and reusable components.
- **Test coverage**: Includes comprehensive unit and integration tests to ensure the functionality and reliability of the application. The tests are written using [Jest](https://jestjs.io/).
- **Accessibility**: Includes general accessibility features like `Semantic HTML`, `Keyboard Navigation`, `ARIA Roles and Attributes`.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/vikashcool1991/react-ts-autocomplete.git
    ```

2. Navigate to the project directory:

    ```bash
    cd react-ts-autocomplete
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:5173`.

## Scripts

- `npm run dev`: Runs the app in development mode.
- `npm run test`: Launches the test runner.
- `npm run build`: Builds the app for production.

## Testing

This project includes comprehensive unit and integration tests to ensure the functionality and reliability of the application. The tests are written using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/). All tests are written in `__test__` directory under respective components and utils directory.

### Running Tests

To run the tests, use the following command:

```bash
npm run test
```

This will execute all test files and display the results in the terminal.

### Test Coverage

To generate a test coverage report, run:

```bash
npm run coverage
```

This will create a `coverage` folder in the root directory. Open the `index.html` file in the `coverage/lcov-report` folder to view the coverage report in your browser:

```bash
open coverage/lcov-report/index.html
```

### Test Coverage Threshold

- **Statements**: >90%
- **Branches**: >80%
- **Functions**: >90%
- **Lines**: >90%

## Project Structure

```bash
react-ts-autocomplete/
├── README.md               # Documentation
├── eslint.config.js
├── index.html              # HTML template
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── questions.md
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── __test__
│   │   └── App.test.tsx
│   ├── assets
│   ├── components
│   │   ├── Autocomplete
│   │   │   ├── SuggestionsList.tsx
│   │   │   ├── __test__
│   │   │   │   ├── SuggestionsList.test.tsx
│   │   │   │   └── index.test.tsx
│   │   │   ├── index.tsx
│   │   │   └── styles.css
│   │   ├── ErrorBoundary
│   │   │   ├── __test__
│   │   │   │   └── index.test.tsx
│   │   │   └── index.tsx
│   │   ├── Icons
│   │   │   ├── Cancel.tsx
│   │   │   └── Search.tsx
│   │   ├── InputSearch
│   │   │   ├── __test__
│   │   │   │   └── index.test.tsx
│   │   │   ├── index.tsx
│   │   │   └── styles.css
│   │   └── TodosList
│   │       ├── __test__
│   │       │   └── index.test.tsx
│   │       ├── index.tsx
│   │       └── styles.css
│   ├── constants
│   │   ├── autocomplete.ts
│   │   ├── requests.ts
│   │   └── todoList.ts
│   ├── hooks
│   │   ├── __test__
│   │   │   ├── useClickAway.test.ts
│   │   │   ├── useDebounce.test.ts
│   │   │   └── useQuery.test.ts
│   │   ├── useClickAway.ts
│   │   ├── useDebounce.ts
│   │   └── useQuery.ts
│   ├── index.css
│   ├── interfaces
│   │   └── index.ts
│   ├── main.tsx
│   ├── providers
│   │   └── todos
│   │       ├── __test__
│   │       │   ├── actions.test.ts
│   │       │   └── reducer.test.ts
│   │       ├── actions.ts
│   │       ├── constants.ts
│   │       ├── index.tsx
│   │       └── reducer.ts
│   ├── requests
│   │   ├── __test__
│   │   │   ├── fetchTodoSuggestions.test.ts
│   │   │   └── fetchTodos.test.ts
│   │   ├── fetchTodoSuggestions.ts
│   │   └── fetchTodos.ts
│   ├── types
│   │   └── index.ts
│   ├── utils
│   │   ├── __test__
│   │   │   ├── fetchSafe.test.ts
│   │   │   ├── filterTodos.test.ts
│   │   │   └── filteredSuggestions.test.ts
│   │   ├── fetchSafe.ts
│   │   ├── filterTodos.ts
│   │   └── filteredSuggestions.ts
│   └── vite-env.d.ts
├── tsconfig.app.json       # TypeScript configuration
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json      # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Usage

1. Start typing in the input field to see suggestions.
2. Suggestions will be fetched asynchronously and displayed in a dropdown.
3. Matching parts of the suggestions will be highlighted.
4. Select a suggestion by clicking on it or using the keyboard.

## Accessibility (a11y)

This project is designed with accessibility in mind to ensure a better user experience for everyone, including users relying on assistive technologies. Below are the key accessibility features implemented in the app:

### General Accessibility Features

- **Semantic HTML**: The app uses semantic HTML elements such as `<main>`, `<table>`, `<thead>`, `<tbody>`, `<th>`, and `<tr>` to provide meaningful structure to the content.
- **Keyboard Navigation**: All interactive elements, such as the autocomplete input, suggestions list, and todos table, are fully keyboard-accessible.
- **ARIA Roles and Attributes**: The app uses appropriate ARIA roles and attributes to enhance accessibility for screen readers:
  - `role="combobox"` for the autocomplete wrapper.
  - `aria-expanded`, `aria-owns`, and `aria-haspopup` for the autocomplete input to indicate the state of the suggestions list.
  - `role="listbox"` and `role="option"` for the suggestions list and its items.
  - `aria-live="polite"` for dynamically updating content like the todos list and suggestions.

### Component-Specific Accessibility Features

#### **Autocomplete**

- **Keyboard Support**: Users can navigate suggestions using the `ArrowUp` and `ArrowDown` keys and select a suggestion with the `Enter` key.
- **Focus Management**: Focus is automatically returned to the input field after selecting a suggestion.
- **Live Region**: The number of suggestions or error messages is announced to screen readers using an ARIA live region (`aria-live="polite"`).
- **Highlighting**: Matching parts of suggestions are visually highlighted for better usability.

#### **Todos List**

- **Table Accessibility**: The todos list is rendered as a semantic table with proper `<thead>`, `<tbody>`, and `<th>` elements.
- **Row Headers**: The `id` column is marked with `scope="row"` to associate row data with its header.
- **Empty State**: Displays a message (`role="alert"`) when no todos are available, ensuring screen readers announce the state.

#### **Input Search**

- **Accessible Input**: The search input uses `aria-autocomplete="list"` and `aria-controls` to associate it with the suggestions list.
- **Clear Button**: The clear button is implemented as a `<button>` element with `aria-label="Clear input"` for screen reader users.

### Accessibility Testing

The app has been tested for accessibility using:

- **Keyboard Navigation**: Verified that all interactive elements are accessible via the keyboard.
- **Screen Readers**: Tested with screen readers to ensure proper announcements of dynamic content.
- **Lighthouse**: Used Lighthouse audits to ensure compliance with accessibility best practices.

## API Integration

The app uses a mock API to fetch suggestions. You can replace the mock API with a real REST API by modifying the:

- `fetchTodoSuggestions` function in `src/requests/fetchTodoSuggestions.ts`
- `fetchTodos` function in `src/requests/fetchTodos.ts`

## Custom Hooks

### `useDebounce`

The `useDebounce` hook is used to delay the execution of a function until after a specified delay. This is particularly useful for reducing the number of API calls when the user is typing.

### `useClickAway`

The `useClickAway` hook is a custom React hook that detects clicks outside of a specified element and triggers a callback function. It is commonly used to handle scenarios like closing dropdowns, modals, or tooltips when the user clicks outside of the component.

### `useQuery`

The useQuery custom hook is typically used to manage data fetching in React applications. It abstracts the logic for making API calls, handling loading states, caching, and error management.

## Edge Cases Handled

- Empty input: No suggestions are displayed.
- No matching results: Displays a "No results found" message.
- API errors: Gracefully handled with an error boundary.
- Rapid typing: Debounced input prevents excessive API calls.

## Styling

Basic CSS is used for styling. You can find the styles in respective components `styles.css`.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m "Add feature-name"
   ```

4. Push to your fork:

   ```bash
   git push origin feature-name
   ```

5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React and TypeScript documentation
- Inspiration from common autocomplete UI patterns

```text
This README.md provides a comprehensive overview of the project, including installation instructions, features, usage, and contribution guidelines. Let me know if you need further adjustments!
```
