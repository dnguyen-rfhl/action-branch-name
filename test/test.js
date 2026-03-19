import test from "node:test";
import assert from "node:assert";
import { getBranchName } from "../src/index.js";

test("getBranchName for push event", () => {
  const eventName = "push";
  const payload = { ref: "refs/heads/feature/abc" };
  const branchName = getBranchName(eventName, payload);
  assert.strictEqual(branchName, "feature/abc");
});

test("getBranchName for pull_request event", () => {
  const eventName = "pull_request";
  const payload = { pull_request: { head: { ref: "fix/123" } } };
  const branchName = getBranchName(eventName, payload);
  assert.strictEqual(branchName, "fix/123");
});

test("getBranchName for invalid event", () => {
  const eventName = "release";
  const payload = {};
  assert.throws(
    () => getBranchName(eventName, payload),
    /Invalid event name: release/,
  );
});
