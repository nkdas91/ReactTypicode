import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import SelectField from "./SelectField";

describe("SelectField accessibility", () => {
  it("has no accessibility violations with visible label", async () => {
    const { container } = render(
      <SelectField
        label="Records per page"
        value={10}
        options={[
          {
            label: "10",
            value: 10,
          },
          {
            label: "20",
            value: 20,
          },
        ]}
        onChange={() => {}}
      />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations with aria label", async () => {
    const { container } = render(
      <SelectField
        ariaLabel="Select records per page"
        value={10}
        options={[
          {
            label: "10",
            value: 10,
          },
          {
            label: "20",
            value: 20,
          },
        ]}
        onChange={() => {}}
      />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
