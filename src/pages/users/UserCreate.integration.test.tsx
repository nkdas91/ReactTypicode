import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

import UserCreate from "./UserCreate";

import userService from "../../services/userService";
import useNotification from "../../context/useNotification";

// Mock API service
vi.mock("../../services/userService", () => ({
  default: {
    post: vi.fn(),
  },
}));

// Mock notification context
vi.mock("../../context/useNotification", () => ({
  default: vi.fn(),
}));

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockShowNotification = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();

  vi.mocked(useNotification).mockReturnValue({
    showNotification: mockShowNotification,
  });
});

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText("Name"), {
    target: { value: "John Doe" },
  });

  fireEvent.change(screen.getByLabelText("Username"), {
    target: { value: "john_doe" },
  });

  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "john@example.com" },
  });

  fireEvent.change(screen.getByLabelText("Phone"), {
    target: { value: "1234567890" },
  });

  fireEvent.change(screen.getByLabelText("Website"), {
    target: { value: "https://example.com" },
  });

  fireEvent.change(screen.getByLabelText("Suite"), {
    target: { value: "101" },
  });

  fireEvent.change(screen.getByLabelText("Street"), {
    target: { value: "Main Street" },
  });

  fireEvent.change(screen.getByLabelText("City"), {
    target: { value: "London" },
  });

  fireEvent.change(screen.getByLabelText("Zip"), {
    target: { value: "12345" },
  });
};

describe("UserCreate integration", () => {
  it("renders user create form", () => {
    render(
      <MemoryRouter>
        <UserCreate />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", {
        name: "Save",
      }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    render(
      <MemoryRouter>
        <UserCreate />
      </MemoryRouter>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Save",
      }),
    );

    expect(await screen.findByText("Name is too short")).toBeInTheDocument();

    expect(userService.post).not.toHaveBeenCalled();
  });

  it("submits valid form successfully", async () => {
    vi.mocked(userService.post).mockResolvedValue({
      id: 11,
      name: "Someone",
      email: "someone@example.com",
      phone: "1234567890",
      username: "someone",
      website: "somene.com",
      address: {
        city: "some city",
        street: "some street",
        suite: "some suite",
        zipcode: "some zip",
      },
    });

    render(
      <MemoryRouter>
        <UserCreate />
      </MemoryRouter>,
    );

    fillValidForm();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Save",
      }),
    );

    await waitFor(() => {
      expect(userService.post).toHaveBeenCalledTimes(1);
    });

    expect(userService.post).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "John Doe",
        username: "john_doe",
        email: "john@example.com",
      }),
    );

    expect(mockShowNotification).toHaveBeenCalledWith("User created");

    expect(mockNavigate).toHaveBeenCalledWith("/users");
  });

  it("shows error notification when API fails", async () => {
    vi.mocked(userService.post).mockRejectedValue(
      new Error("Failed to create user"),
    );

    render(
      <MemoryRouter>
        <UserCreate />
      </MemoryRouter>,
    );

    fillValidForm();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Save",
      }),
    );

    await waitFor(() => {
      expect(mockShowNotification).toHaveBeenCalledWith(
        "Failed to create user",
        "error",
      );
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("disables submit button while saving", async () => {
    let resolveRequest!: () => void;

    vi.mocked(userService.post).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRequest = () =>
            resolve({
              id: 11,
              name: "Someone",
              email: "someone@example.com",
              phone: "1234567890",
              username: "someone",
              website: "somene.com",
              address: {
                city: "some city",
                street: "some street",
                suite: "some suite",
                zipcode: "some zip",
              },
            });
        }),
    );

    render(
      <MemoryRouter>
        <UserCreate />
      </MemoryRouter>,
    );

    fillValidForm();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Save",
      }),
    );

    expect(
      screen.getByRole("button", {
        name: "Saving...",
      }),
    ).toBeDisabled();

    resolveRequest();

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: "Save",
        }),
      ).toBeEnabled();
    });
  });
});
