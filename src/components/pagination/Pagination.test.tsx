import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pagination from "./Pagination";

describe("Pagination", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders pagination information", () => {
    render(
      <Pagination
        totalRecords={100}
        currentPage={1}
        limit={10}
        dataLength={10}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByText("Showing records 1 to 10 of 100 records."),
    ).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(
      <Pagination
        totalRecords={100}
        currentPage={1}
        limit={10}
        dataLength={10}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Previous",
      }),
    ).toBeDisabled();
  });

  it("enables previous button after first page", () => {
    render(
      <Pagination
        totalRecords={100}
        currentPage={2}
        limit={10}
        dataLength={10}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Previous",
      }),
    ).not.toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(
      <Pagination
        totalRecords={100}
        currentPage={10}
        limit={10}
        dataLength={10}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Next",
      }),
    ).toBeDisabled();
  });

  it("enables next button when more pages exist", () => {
    render(
      <Pagination
        totalRecords={100}
        currentPage={5}
        limit={10}
        dataLength={10}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Next",
      }),
    ).not.toBeDisabled();
  });

  it("calls onPageChange when previous button is clicked", async () => {
    const user = userEvent.setup();

    const onPageChange = vi.fn();

    render(
      <Pagination
        totalRecords={100}
        currentPage={3}
        limit={10}
        dataLength={10}
        onPageChange={onPageChange}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Previous",
      }),
    );

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange when next button is clicked", async () => {
    const user = userEvent.setup();

    const onPageChange = vi.fn();

    render(
      <Pagination
        totalRecords={100}
        currentPage={3}
        limit={10}
        dataLength={10}
        onPageChange={onPageChange}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Next",
      }),
    );

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("does not render controls when total records are zero", () => {
    render(
      <Pagination
        totalRecords={0}
        currentPage={1}
        limit={10}
        dataLength={0}
        onPageChange={() => {}}
      />,
    );

    expect(
      screen.queryByRole("button", {
        name: "Previous",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Next",
      }),
    ).not.toBeInTheDocument();
  });

  it("does not render controls when current page has no data", () => {
    render(
      <Pagination
        totalRecords={100}
        currentPage={11}
        limit={10}
        dataLength={0}
        onPageChange={() => {}}
      />,
    );

    expect(screen.queryByText(/Showing records/)).not.toBeInTheDocument();
  });
});
