# Questions and Answers

## 1. What is the difference between Component and PureComponent? Give an example where it might break my app?

- **Component**: Re-renders every time its parent re-renders, regardless of whether its props or state have changed.
- **PureComponent**: Implements a shallow comparison of props and state to prevent unnecessary re-renders.

**Example where it might break:**
If you pass a non-immutable object as a prop to a `PureComponent`, it may not detect changes because it only performs a shallow comparison.

```tsx
class MyComponent extends React.PureComponent {
render() {
    console.log("Rendered");
    return <div>{this.props.data.value}</div>;
}
}

const data = { value: 1 };
<MyComponent data={data} />;

// Updating `data.value` without creating a new object:
data.value = 2;
// PureComponent won't re-render because the reference to `data` hasn't changed.
```

---

## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

Using `shouldComponentUpdate` in a component that consumes context can prevent it from re-rendering when the context value changes. This happens because `shouldComponentUpdate` only checks props and state, not context.

**Example:**

```tsx
const MyContext = React.createContext();

class MyComponent extends React.Component {
  shouldComponentUpdate() {
    return false; // Prevents re-rendering
  }

  render() {
    return (
      <MyContext.Consumer>
        {(value) => <div>{value}</div>}
      </MyContext.Consumer>
    );
  }
}
```

If the context value changes, `MyComponent` won't update.

---

## 3. Describe 3 ways to pass information from a component to its PARENT

1. **Callback Functions**: Pass a function from the parent to the child, and call it in the child with the data.

   ```tsx
   const Parent = () => {
     const handleData = (data) => console.log(data);
     return <Child onSendData={handleData} />;
   };

   const Child = ({ onSendData }) => {
     return <button onClick={() => onSendData("Hello Parent")}>Send</button>;
   };
   ```

2. **State Lifting**: Manage shared state in the parent and pass it down as props.

   ```tsx
   const Parent = () => {
     const [data, setData] = React.useState("");
     return <Child setData={setData} />;
   };

   const Child = ({ setData }) => {
     return <button onClick={() => setData("Updated Data")}>Update</button>;
   };
   ```

3. **Refs**: Use `React.forwardRef` to expose child methods or data to the parent.

   ```tsx
   const Child = React.forwardRef((props, ref) => {
     React.useImperativeHandle(ref, () => ({
       getData: () => "Child Data",
     }));
     return <div>Child</div>;
   });

   const Parent = () => {
     const childRef = React.useRef();
     React.useEffect(() => console.log(childRef.current.getData()), []);
     return <Child ref={childRef} />;
   };
   ```

---

## 4. Give 2 ways to prevent components from re-rendering

1. **Using `React.memo`**:

   ```tsx
   const MyComponent = React.memo(({ value }) => {
     console.log("Rendered");
     return <div>{value}</div>;
   });
   ```

2. **Using `shouldComponentUpdate` or `React.PureComponent`**:

   ```tsx
   class MyComponent extends React.PureComponent {
     render() {
       return <div>{this.props.value}</div>;
     }
   }
   ```

---

## 5. What is a fragment and why do we need it? Give an example where it might break my app ?

- **Fragment**: A lightweight wrapper that allows grouping multiple elements without adding extra DOM nodes.
- **Why we need it**: To avoid unnecessary `<div>` wrappers in the DOM.

**Example where it might break:**
If you rely on DOM structure for styling or layout, fragments can break your app.

```tsx
<>
  <div>Item 1</div>
  <div>Item 2</div>
</>
```

If CSS selectors depend on a parent wrapper, this structure won't work.

---

## 6. Give 3 examples of the HOC pattern ?

1. **Authentication HOC**:

   ```tsx
    import React from "react";
    import { Redirect } from "react-router-dom";

    const withAuth = (Component: React.ComponentType) => {
        return (props: any) => {
            const isAuthenticated = Boolean(localStorage.getItem("authToken"));
            return isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />;
        };
    };

    // Usage
    const Dashboard = () => <div>Welcome to the Dashboard</div>;
    export default withAuth(Dashboard);
   ```

2. **Logging HOC**:

   ```tsx
   import React, { useEffect } from "react";

    const withLogging = (Component: React.ComponentType) => {
        return (props: any) => {
            useEffect(() => {
            console.log(`Rendering component: ${Component.name}`);
            }, []);

            return <Component {...props} />;
        };
    };

    // Usage
    const Profile = () => <div>User Profile</div>;
    export default withLogging(Profile);
   ```

3. **Error Boundary HOC**:

   ```tsx
   import React, { Component, ErrorInfo } from "react";

    class ErrorBoundary extends Component {
        state = { hasError: false };

        static getDerivedStateFromError() {
            return { hasError: true };
        }

        componentDidCatch(error: Error, info: ErrorInfo) {
            console.error("Error caught in ErrorBoundary:", error, info);
        }

        render() {
            if (this.state.hasError) {
                return <div>Something went wrong.</div>;
            }
            return this.props.children;
        }
    }

    const withErrorBoundary = (Component: React.ComponentType) => {
        return (props: any) => (
            <ErrorBoundary>
                <Component {...props} />
            </ErrorBoundary>
        );
    };

    // Usage
    const Settings = () => <div>App Settings</div>;
    export default withErrorBoundary(Settings);
   ```

---

## 7. What's the difference in handling exceptions in promises, callbacks and async...await?

- **Promises**: Use `.catch()` to handle errors.

  ```tsx
  fetchData().then(data => console.log(data)).catch(err => console.error(err));
  ```

- **Callbacks**: Pass an error as the first argument.

  ```tsx
  fetchData((err, data) => {
    if (err) console.error(err);
    else console.log(data);
  });
  ```

- **Async/Await**: Use `try...catch` for synchronous-like error handling.

  ```tsx
  try {
    const data = await fetchData();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
  ```

---

## 8. How many arguments does setState take and why is it async?

### **Arguments**

`setState` takes two arguments:

  1. **Updater Function or Object**:  

        - This is the new state value or a function that returns the new state based on the previous state.
        - Example with an object:

            ```tsx
            this.setState({ count: 1 });
            ```

        - Example with an updater function:

            ```tsx
            this.setState((prevState) => ({ count: prevState.count + 1 }));
            ```

  2. **Optional Callback Function**:

        - This is a function that gets executed after the state has been updated and the component has re-rendered.
        - Example:

            ```tsx
            this.setState({ count: 1 }, () => {
                console.log("State updated!");
            });
            ```

### **Why is it async**

`setState` is asynchronous because React batches multiple state updates for performance optimization. Instead of updating the state immediately, React waits until the end of the event loop or the next render cycle to process all state updates together. This ensures:

1. **Efficient Re-renders**: React minimizes the number of re-renders by combining multiple state updates into a single render.
2. **Improved Performance**: By batching updates, React avoids unnecessary DOM updates and improves the app's performance.

#### **Example of Batching:**

```tsx
class Counter extends React.Component {
  state = { count: 0 };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count); // Logs 0 because updates are batched
  };

  render() {
    return <button onClick={this.increment}>Increment</button>;
  }
}
```

---

## 9. List the steps needed to migrate a Class to Function Component?

1. Replace `class` with a function.
2. Replace `this.state` with `useState`.
3. Replace lifecycle methods with `useEffect`.
4. Remove `this` references.
5. Convert methods to functions inside the component.
6. Move the JSX from render() menthod to the return statement of function component.

### Example

#### Class Component

```tsx
import React, { Component } from "react";

class MyComponent extends Component {
  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
      </div>
    );
  }
}

export default MyComponent;
```

#### Converted Functional Component

```tsx
import React from "react";

const MyComponent: React.FC = () => {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
};

export default MyComponent;
```

---

## 10. List a few ways styles can be used with components?

1. **Inline Styles**:

   ```tsx
   <div style={{ color: "red" }}>Hello</div>
   ```

2. **CSS Modules**:

   ```tsx
   import styles from "./styles.module.css";
   <div className={styles.red}>Hello</div>;
   ```

3. **Styled Components**:

   ```tsx
   const StyledDiv = styled.div`color: red;`;
   <StyledDiv>Hello</StyledDiv>;
   ```

4. **Global CSS**:

   ```tsx
   import "./styles.css";
   <div className="red">Hello</div>;
   ```

---

## 11. How to render an HTML string coming from the server?

Use `dangerouslySetInnerHTML`:

```tsx
<div dangerouslySetInnerHTML={{ __html: "<p>Hello World</p>" }} />
```

**Warning**: Ensure the HTML is sanitized to prevent XSS attacks.

---
