import getLikedPostsPieData from "./getLikedPostsPieData";

describe("getLikedPostsPieData", () => {
  it("returns liked and not liked counts", () => {
    const result = getLikedPostsPieData(10, 4);

    expect(result).toEqual([
      {
        name: "Liked",
        value: 4,
        fill: expect.any(String),
      },
      {
        name: "Not Liked",
        value: 6,
        fill: expect.any(String),
      },
    ]);
  });
});
