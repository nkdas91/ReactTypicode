import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders navigation links", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );

    expect(screen.getByText("Home")).toBeInTheDocument();

    expect(screen.getByText("Users")).toBeInTheDocument();

    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});
