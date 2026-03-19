import test from "node:test";
import assert from "node:assert";
import { getBranchName } from "../src/index.js";

// Mock @actions/core and @actions/github
// This is tricky because src/index.js imports them directly.
// We can use environment variables to mock them for the most part.

test("getBranchName logic", () => {
    assert.strictEqual(getBranchName('push', { ref: 'refs/heads/main' }), 'main');
    assert.strictEqual(getBranchName('pull_request', { pull_request: { head: { ref: 'feat/abc' } } }), 'feat/abc');
});

test("getBranchName for tags", () => {
    // Current implementation:
    assert.strictEqual(getBranchName('push', { ref: 'refs/tags/v1.0.0' }), 'refs/tags/v1.0.0');
});

test("Prefix logic", () => {
    const prefixes = "feature, hotfix";
    const branch = "hotfix/abc";
    // This is how it's implemented in src/index.js
    const match = prefixes.split(',').some((el) => branch.startsWith(el));
    assert.strictEqual(match, false); // FAILS because of space
});

test("Ignore logic", () => {
    const ignore = "master, develop";
    const branch = "develop";
    const match = ignore.split(',').some((el) => branch === el);
    assert.strictEqual(match, false); // FAILS because of space
});
