import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import FavouriteButton from "./FavouriteButton";

describe("FavouriteButton accessibility", () => {
  it("has no accessibility violations when not favourite", async () => {
    const { container } = render(
      <FavouriteButton isFavourite={false} toggleFavourite={() => {}} />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations when favourite", async () => {
    const { container } = render(
      <FavouriteButton isFavourite={true} toggleFavourite={() => {}} />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
