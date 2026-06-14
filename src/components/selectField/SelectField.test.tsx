import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SelectField from "./SelectField";

describe("SelectField", () => {
  const options = [
    {
      label: "10 Records",
      value: 10,
    },
    {
      label: "20 Records",
      value: 20,
    },
    {
      label: "50 Records",
      value: 50,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders select with visible label", () => {
    render(
      <SelectField
        label="Records per page"
        value={10}
        options={options}
        onChange={() => {}}
      />,
    );

    expect(screen.getByLabelText("Records per page")).toBeInTheDocument();
  });

  it("renders select with aria label", () => {
    render(
      <SelectField
        ariaLabel="Select number of records"
        value={10}
        options={options}
        onChange={() => {}}
      />,
    );

    expect(
      screen.getByLabelText("Select number of records"),
    ).toBeInTheDocument();
  });

  it("renders all options", () => {
    render(
      <SelectField
        label="Records"
        value={10}
        options={options}
        onChange={() => {}}
      />,
    );

    expect(
      screen.getByRole("option", {
        name: "10 Records",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "20 Records",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "50 Records",
      }),
    ).toBeInTheDocument();
  });

  it("sets selected value", () => {
    render(
      <SelectField
        label="Records"
        value={20}
        options={options}
        onChange={() => {}}
      />,
    );

    expect(screen.getByLabelText("Records")).toHaveValue("20");
  });

  it("calls onChange when selection changes", async () => {
    const user = userEvent.setup();

    const onChange = vi.fn();

    render(
      <SelectField
        label="Records"
        value={10}
        options={options}
        onChange={onChange}
      />,
    );

    await user.selectOptions(screen.getByLabelText("Records"), "50");

    expect(onChange).toHaveBeenCalledWith("50");
  });

  it("supports string values", () => {
    render(
      <SelectField
        label="Status"
        value="active"
        options={[
          {
            label: "Active",
            value: "active",
          },
          {
            label: "Inactive",
            value: "inactive",
          },
        ]}
        onChange={() => {}}
      />,
    );

    expect(screen.getByLabelText("Status")).toHaveValue("active");
  });
});
