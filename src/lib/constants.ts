export const APP_TITLE = "YourHome";
export const DATABASE_PREFIX = "v0-yourhome";
export const EMAIL_SENDER = '"Acme" <noreply@acme.com>';

export const redirects = {
  toLogin: "/login",
  toSignup: "/signup",
  afterLogin: "/dashboard",
  afterLogout: "/",
  toVerify: "/verify-email",
  afterVerify: "/dashboard",
} as const;