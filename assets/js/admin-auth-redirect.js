// Identity email links can land on the homepage. Complete them in the CMS,
// keeping the token in the browser fragment rather than sending it to a server.
(function () {
  "use strict";
  if (/^#(?:invite_token|confirmation_token|recovery_token|email_change_token)=/.test(window.location.hash)) {
    window.location.replace("/admin/" + window.location.hash);
  }
})();
