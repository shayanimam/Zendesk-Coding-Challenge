import { Ticket } from "./Ticket";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

const defaultProps = {
  id: 1,
  subject: "abcd",
  description: "efg",
  status: "open",
  created_at: "today",
};

describe("Ticket", () => {
  it("renders", () => {
    const { container } = render(<Ticket {...defaultProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });
  it("opens a dialog when clicked", () => {
    const { getByText } = render(<Ticket {...defaultProps} />);

    const ticket = getByText("abcd");
    fireEvent.click(ticket);
    const description = getByText("efg");

    expect(description).toBeVisible();
  });
});
