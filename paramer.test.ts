import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.83.0/testing/asserts.ts";
import { parse, replace, Struct } from "./paramer.ts";

Deno.test("parse", async (t) => {
  await t.step("happy path", () => {
    const path = "/user/{user_id}/profile/{profile_id}";
    const struct = parse(path);
    const expected: Struct = {
      path: "/user/{user_id}/profile/{profile_id}",
      params: [
        { key: "user_id", start: 6, end: 14 },
        { key: "profile_id", start: 24, end: 35 },
      ],
    };

    assertEquals(struct, expected);
  });

  await t.step("invalid path", () => {
    const path = "/user/{user_id}/profile/{profile_id";

    assertThrows(() => parse(path));
  });

  await t.step("invalid path", () => {
    const path = "/user/{user_id}/profile/profile_id}";

    assertThrows(() => parse(path));
  });

  await t.step("invalid path", () => {
    const path = "/user/{user_id{/profile/{profile_id}";

    assertThrows(() => parse(path));
  });
});

Deno.test("replace", async (t) => {
  await t.step("happy path", () => {
    const path = "/user/{user_id}/profile/{profile_id}";
    const params = {
      user_id: "123",
      profile_id: "456",
    };
    const replaced = replace(path, params);

    assertEquals(replaced, "/user/123/profile/456");
  });

  await t.step("invalid path", () => {
    const path = "/user/{user_id}/profile/{profile_id}";
    const params = {
      user_id: "123",
    };

    assertThrows(() => replace(path, params));
  });
});
