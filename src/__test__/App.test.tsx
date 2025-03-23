import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {
    test("renders the main heading", () => {
        render(<App />);
        const headingElement = screen.getByText(/React TS Autocomplete/i);
        expect(headingElement).toBeInTheDocument();
    });

    test("renders the AutoComplete component", () => {
        render(<App />);
        const autoCompleteElement = screen.getByRole("textbox");
        expect(autoCompleteElement).toBeInTheDocument();
    });
});