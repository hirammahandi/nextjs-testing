import { render, screen } from "@testing-library/react";
import Hello from "./Hello";

test('should renders "Hello World"', () => {
  //* first render a component that we going to test
  render(<Hello />);

  //* getting the element redered by text that be should in the component on the screen view
  const myElement = screen.getByText("Hello World");

  //* expect if the element getted by text is in decument with the next function
  expect(myElement).toBeInTheDocument();
});
