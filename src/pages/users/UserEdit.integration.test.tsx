import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import UserEdit from "./UserEdit";

import useUser from "../../hooks/users/useUser";
import useUpdateUserForm from "../../hooks/users/useUpdateUserForm";

vi.mock("../../hooks/users/useUser");
vi.mock("../../hooks/users/useUpdateUserForm");

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockUser = {
  id: 1,
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  phone: "1234567890",
  website: "https://example.com",
  address: {
    suite: "123",
    street: "Main Street",
    city: "London",
    zipcode: "12345",
  },
};

const renderComponent = () => {
  return render(
    <MemoryRouter initialEntries={["/users/edit/1"]}>
      <Routes>
        <Route path="/users/edit/:id" element={<UserEdit />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("UserEdit integration", () => {
  beforeEach(() => {
    vi.resetAllMocks();

    vi.mocked(useUpdateUserForm).mockReturnValue({
      form: null,
      errors: {},
      loading: false,
      handleChange: vi.fn(),
      handleAddressChange: vi.fn(),
      handleBlur: vi.fn(),
      handleAddressBlur: vi.fn(),
      handleSubmit: vi.fn(),
    });
  });

  it("shows loading skeleton while fetching user", () => {
    vi.mocked(useUser).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    } as ReturnType<typeof useUser>);

    renderComponent();

    expect(document.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("shows error message when loading user fails", () => {
    vi.mocked(useUser).mockReturnValue({
      data: undefined,
      error: new Error("Failed to load user"),
      isLoading: false,
    } as ReturnType<typeof useUser>);

    renderComponent();

    expect(screen.getByText("Failed to load user")).toBeInTheDocument();
  });

  it("shows not found message when user does not exist", () => {
    vi.mocked(useUser).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: false,
    } as ReturnType<typeof useUser>);

    renderComponent();

    expect(screen.getByText("User not found")).toBeInTheDocument();
  });

  it("renders user form with existing data", () => {
    vi.mocked(useUser).mockReturnValue({
      data: mockUser,
      error: null,
      isLoading: false,
    } as ReturnType<typeof useUser>);

    vi.mocked(useUpdateUserForm).mockReturnValue({
      form: mockUser,
      errors: {},
      loading: false,
      handleChange: vi.fn(),
      handleAddressChange: vi.fn(),
      handleBlur: vi.fn(),
      handleAddressBlur: vi.fn(),
      handleSubmit: vi.fn(),
    });

    renderComponent();

    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();

    expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Save",
      }),
    ).toBeInTheDocument();
  });

  it("submits updated user data", () => {
    const handleSubmit = vi.fn((event) => event.preventDefault());

    vi.mocked(useUser).mockReturnValue({
      data: mockUser,
      error: null,
      isLoading: false,
    } as ReturnType<typeof useUser>);

    vi.mocked(useUpdateUserForm).mockReturnValue({
      form: {
        ...mockUser,
        name: "Updated Name",
      },
      errors: {},
      loading: false,
      handleChange: vi.fn(),
      handleAddressChange: vi.fn(),
      handleBlur: vi.fn(),
      handleAddressBlur: vi.fn(),
      handleSubmit,
    });

    renderComponent();

    fireEvent.submit(
      screen.getByRole("button", {
        name: "Save",
      }),
    );

    expect(handleSubmit).toHaveBeenCalled();
  });

  it("shows saving state while updating", () => {
    vi.mocked(useUser).mockReturnValue({
      data: mockUser,
      error: null,
      isLoading: false,
    } as ReturnType<typeof useUser>);

    vi.mocked(useUpdateUserForm).mockReturnValue({
      form: mockUser,
      errors: {},
      loading: true,
      handleChange: vi.fn(),
      handleAddressChange: vi.fn(),
      handleBlur: vi.fn(),
      handleAddressBlur: vi.fn(),
      handleSubmit: vi.fn(),
    });

    renderComponent();

    expect(
      screen.getByRole("button", {
        name: "Saving...",
      }),
    ).toBeDisabled();
  });
});
