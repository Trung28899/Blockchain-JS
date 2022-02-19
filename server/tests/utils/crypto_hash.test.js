import { crypto_hash } from "../../util/crypto_hash";

test("Testing Block Mining", () => {
  expect(crypto_hash(1, "three", [2])).toBe(
    "e0f28556d272a445c68e30fcc054276c671e64913d1eeaf52de08f6d18139486"
  );

  expect(crypto_hash(1, [2], "three")).toBe(crypto_hash("three", 1, [2]));
});
