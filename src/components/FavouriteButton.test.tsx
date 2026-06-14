import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FavouriteButton from "./FavouriteButton";

describe("FavouriteButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders add favourite state when not favourite", () => {
    render(<FavouriteButton isFavourite={false} toggleFavourite={() => {}} />);

    const button = screen.getByRole("button", {
      name: "Add to favorites",
    });

    expect(button).toBeInTheDocument();

    expect(button).toHaveClass("favourite-button-inactive");
  });

  it("renders remove favourite state when favourite", () => {
    render(<FavouriteButton isFavourite={true} toggleFavourite={() => {}} />);

    const button = screen.getByRole("button", {
      name: "Remove from favorites",
    });

    expect(button).toBeInTheDocument();

    expect(button).toHaveClass("favourite-button-active");
  });

  it("renders correct title attribute when not favourite", () => {
    render(<FavouriteButton isFavourite={false} toggleFavourite={() => {}} />);

    expect(screen.getByRole("button")).toHaveAttribute(
      "title",
      "Add to favorites",
    );
  });

  it("renders correct title attribute when favourite", () => {
    render(<FavouriteButton isFavourite={true} toggleFavourite={() => {}} />);

    expect(screen.getByRole("button")).toHaveAttribute(
      "title",
      "Remove from favorites",
    );
  });

  it("calls toggleFavourite when clicked", async () => {
    const user = userEvent.setup();

    const toggleFavourite = vi.fn();

    render(
      <FavouriteButton isFavourite={false} toggleFavourite={toggleFavourite} />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Add to favorites",
      }),
    );

    expect(toggleFavourite).toHaveBeenCalledTimes(1);
  });

  it("changes action label when favourite state changes", () => {
    const { rerender } = render(
      <FavouriteButton isFavourite={false} toggleFavourite={() => {}} />,
    );

    expect(
      screen.getByRole("button", {
        name: "Add to favorites",
      }),
    ).toBeInTheDocument();

    rerender(<FavouriteButton isFavourite={true} toggleFavourite={() => {}} />);

    expect(
      screen.getByRole("button", {
        name: "Remove from favorites",
      }),
    ).toBeInTheDocument();
  });
});
