const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const script = fs.readFileSync(path.join(__dirname, "../assets/js/admin-auth-redirect.js"), "utf8");

test("Identity email links reach the CMS without putting tokens in query parameters", () => {
  for (const type of ["invite_token", "confirmation_token", "recovery_token", "email_change_token"]) {
    let destination;
    const hash = `#${type}=test-value&next=ignored`;
    vm.runInNewContext(script, { window: { location: { hash, replace(url) { destination = url; } } } });
    assert.equal(destination, `/admin/${hash}`);
  }
});

test("normal navigation and unrelated fragments stay on the public site", () => {
  for (const hash of ["", "#contactos", "#portfolio", "#unrelated=invite_token"]) {
    vm.runInNewContext(script, { window: { location: { hash, replace() { assert.fail("Unexpected redirect"); } } } });
  }
});
