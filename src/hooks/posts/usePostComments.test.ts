import { act, renderHook } from "@testing-library/react";
import useCommentForm from "./useCommentForm";
import useComments from "./useComments";
import useLocalStorage from "./useLocalStorage";
import usePostComments from "./usePostComments";

vi.mock("./useComments");
vi.mock("./useLocalStorage");
vi.mock("./useCommentForm");

describe("usePostComments", () => {
  const mockSetSavedComments = vi.fn();

  const mockFormHandlers = {
    form: {
      postId: 1,
      id: 0,
      name: "",
      email: "",
      body: "",
    },
    errors: {},
    handleChange: vi.fn(),
    handleBlur: vi.fn(),
    handleSubmit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useComments).mockReturnValue({
      data: {
        data: [
          {
            id: 2,
            postId: 1,
            name: "API Comment",
            email: "api@test.com",
            body: "From API",
          },
        ],
      },
      isLoading: false,
    } as never);

    vi.mocked(useLocalStorage).mockReturnValue([
      [
        {
          id: 1,
          postId: 1,
          name: "Local Comment",
          email: "local@test.com",
          body: "From Local",
        },
      ],
      mockSetSavedComments,
    ] as never);

    vi.mocked(useCommentForm).mockReturnValue(mockFormHandlers as never);
  });

  it("merges local and api comments", () => {
    const { result } = renderHook(() => usePostComments(1));

    expect(result.current.comments).toHaveLength(2);

    expect(result.current.comments[0].name).toBe("Local Comment");
    expect(result.current.comments[1].name).toBe("API Comment");
  });

  it("returns loading state from useComments", () => {
    const { result } = renderHook(() => usePostComments(1));

    expect(result.current.isLoading).toBe(false);
  });

  it("toggles form visibility", () => {
    const { result } = renderHook(() => usePostComments(1));

    expect(result.current.formVisible).toBe(false);

    act(() => {
      result.current.toggleFormVisibility();
    });

    expect(result.current.formVisible).toBe(true);

    act(() => {
      result.current.toggleFormVisibility();
    });

    expect(result.current.formVisible).toBe(false);
  });

  it("returns form state and handlers from useCommentForm", () => {
    const { result } = renderHook(() => usePostComments(1));

    expect(result.current.form).toEqual(mockFormHandlers.form);
    expect(result.current.errors).toEqual(mockFormHandlers.errors);
    expect(result.current.handleChange).toBe(mockFormHandlers.handleChange);
    expect(result.current.handleBlur).toBe(mockFormHandlers.handleBlur);
    expect(result.current.handleSubmit).toBe(mockFormHandlers.handleSubmit);
  });
});
