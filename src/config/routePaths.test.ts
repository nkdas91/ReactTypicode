import { ROUTES } from "./routePaths";

describe("ROUTES", () => {
  describe("home routes", () => {
    it("returns the home route", () => {
      expect(ROUTES.home).toBe("/");
    });
  });

  describe("user routes", () => {
    it("returns the users list route", () => {
      expect(ROUTES.users.list).toBe("/users");
    });

    it("returns the user create route", () => {
      expect(ROUTES.users.create).toBe("/users/create");
    });

    it("returns the user details route with placeholder id by default", () => {
      expect(ROUTES.users.details()).toBe("/users/:id");
    });

    it("returns the user details route with a numeric id", () => {
      expect(ROUTES.users.details(123)).toBe("/users/123");
    });

    it("returns the user details route with a string id", () => {
      expect(ROUTES.users.details("abc")).toBe("/users/abc");
    });

    it("returns the user edit route with placeholder id by default", () => {
      expect(ROUTES.users.edit()).toBe("/users/:id/edit");
    });

    it("returns the user edit route with a numeric id", () => {
      expect(ROUTES.users.edit(123)).toBe("/users/123/edit");
    });

    it("returns the user edit route with a string id", () => {
      expect(ROUTES.users.edit("abc")).toBe("/users/abc/edit");
    });
  });

  describe("post routes", () => {
    it("returns the posts list route", () => {
      expect(ROUTES.posts.list).toBe("/posts");
    });

    it("returns the post details route with placeholder id by default", () => {
      expect(ROUTES.posts.details()).toBe("/posts/:id");
    });

    it("returns the post details route with a numeric id", () => {
      expect(ROUTES.posts.details(123)).toBe("/posts/123");
    });

    it("returns the post details route with a string id", () => {
      expect(ROUTES.posts.details("abc")).toBe("/posts/abc");
    });

    it("returns the post edit route with placeholder id by default", () => {
      expect(ROUTES.posts.edit()).toBe("/posts/:id/edit");
    });

    it("returns the post edit route with a numeric id", () => {
      expect(ROUTES.posts.edit(123)).toBe("/posts/123/edit");
    });

    it("returns the post edit route with a string id", () => {
      expect(ROUTES.posts.edit("abc")).toBe("/posts/abc/edit");
    });
  });
});
