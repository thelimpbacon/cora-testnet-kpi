import consolidate from "./consolidate";
const deposits = [
  {
    id: "0x09ae40d7c86a77f8ed70628ba5b07f4012393dd6bef562879cdb007eab6fab85",
    timestamp: 1671571140,
  },
  {
    id: "0x03c1cf24a3ac13b637cb65823a979cf6f23f7a5a89575160f7cb2f3a47a7cd24",
    timestamp: 1671639775,
  },
];

describe("test consolidate", () => {
  it("should return empty object if data is empty", () => {
    const data = {};
    const result = consolidate(data);
    expect(result).toEqual({});
  });

  it("should return empty object if data is undefined but has a label", () => {
    const data = { deposits: undefined, borrows: undefined };
    const result = consolidate(data);
    expect(result).toEqual({ deposits: {}, borrows: {} });
  });

  it("should consolidate deposits transactions", () => {
    const result = consolidate({ deposits });

    expect(result).toEqual({
      deposits: {
        "2022-12-20": 1,
        "2022-12-21": 1,
      },
    });
  });

  it("should consolidate deposits and borrow transactions", () => {
    const result = consolidate({ deposits, borrows: deposits });

    expect(result).toEqual({
      deposits: {
        "2022-12-20": 1,
        "2022-12-21": 1,
      },
      borrows: {
        "2022-12-20": 1,
        "2022-12-21": 1,
      },
    });
  });
});
