import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Counter, CounterProps } from ".";
//! user-event library allows work with all events
import user from "@testing-library/user-event";

describe("Counter Component", () => {
  //-----------------------------------------------------------------------------------------
  describe("initialized with defaultCounter= 10 and description='WWW'", () => {
    const counterProps: CounterProps = {
      description: "WWW",
      defaultCount: 10,
    };

    beforeEach(() => {
      render(<Counter {...counterProps} />);
    });

    test("should render 'Current Count: 10'", () => {
      expect(screen.getByText("Current Count: 10")).toBeInTheDocument();
    });

    test('should render a title as "WWW"', () => {
      expect(screen.getByText(/www/i)).toBeInTheDocument();
    });

    describe('when the incrementor changes to 5 and "+" button is clicked', () => {
      beforeEach(() => {
        /*type(element, text, [options])
                Writes text inside an <input> or a <textarea>. with an especial character {action} like
                {selectall} what they are the action that the user can to do
 */
        user.type(screen.getByLabelText(/Incrementor/i), "{selectall}5");
        user.click(screen.getByRole("button", { name: "Increment" }));
      });
      const sum = counterProps.defaultCount + 5;

      test(`should renders "Current Count: ${sum}"`, () => {
        expect(screen.getByText(`Current Count: ${sum}`)).toBeInTheDocument();
      });
    });

    describe('when the incrementor changes to 25 and "-" button is clicked', () => {
      beforeEach(() => {
        /*type(element, text, [options])
                Writes text inside an <input> or a <textarea>. with an especial character {action} like
                {selectall} what they are the action that the user can to do
 */
        user.type(screen.getByLabelText(/Incrementor/i), "{selectall}25");
        user.click(screen.getByRole("button", { name: "Decrement" }));
      });

      const res = counterProps.defaultCount - 25;
      test(`should renders "Current Count: ${res}"`, () => {
        expect(screen.getByText(`Current Count: ${res}`)).toBeInTheDocument();
      });
    });
  });

  //-----------------------------------------------------------------------------------------
  describe("initialized with defaultCounter=0 and description='My Counter'", () => {
    const counterProps: CounterProps = {
      description: "My Counter",
      defaultCount: 0,
    };

    // beforeEach means that all test going to render the componet that be tested
    beforeEach(() => {
      render(<Counter {...counterProps} />);
    });

    test("should render 'Current Count: 0 '", () => {
      expect(screen.getByText("Current Count: 0")).toBeInTheDocument();
    });

    test('should render a title as "My Counter"', () => {
      //The letter i after of regular expression means that the function will accept anything form of the parameter
      expect(screen.getByText(/my Counter/i)).toBeInTheDocument();
    });

    describe("when + button is clicked", () => {
      beforeEach(() => {
        // fireEvent what he does is manage envents like click event. For example we are testing that it should to do when we click in the plus button
        fireEvent.click(screen.getByRole("button", { name: "Increment" }));
      });

      test("render ' Current Counter: 1'", () => {
        // expect that element with text current... be in the document
        expect(screen.getByText("Current Count: 1")).toBeInTheDocument();
      });
    });

    describe("when - button is clicked", () => {
      beforeEach(() => {
        // fireEvent what he does is manage envents like click event. For example we are testing that it should to do when we click in the plus button
        //*fireEvetn may be change by user-event and work better
        fireEvent.click(screen.getByRole("button", { name: "Decrement" }));
      });

      test("render 'Current Counter: -1'", () => {
        // expect that element with text current... be in the document
        expect(screen.getByText("Current Count: -1")).toBeInTheDocument();
      });
    });
  });

  //-----------------------------------------------------------------------------------------
  describe("when '+ Async' button is clicked", () => {
    const counterProps: CounterProps = {
      defaultCount: 5,
      description: "Async Counter",
    };
    const sum: number = counterProps.defaultCount + 5;

    beforeEach(async () => {
      render(<Counter {...counterProps} />);
      user.type(screen.getByLabelText(/Incrementor/i), "{selectall}5");
      user.click(screen.getByRole("button", { name: /Async/ }));
      await screen.findByText(`Current Count: ${sum}`);
    });

    test("should render 'Current Count: 10'", /* async */ () => {
      //* first solution
      //* await waitFor(()=> expect(screen.getByText(`Current Count: ${sum}`)).toBeInTheDocument())
      expect(screen.getByText(`Current Count: ${sum}`)).toBeInTheDocument();
    });
  });
});

//! the todo method will show us the tests that will have to do
//* test.todo("should defautlCount= 0, and plus button clicked counter = 1",()=>{});
