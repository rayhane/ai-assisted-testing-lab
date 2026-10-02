# User story: Login

**As a** user, **I want to** log in with my email and password **so that** I can access my account.

## Acceptance criteria

1. The email must have a valid format.
2. The password contains at least 8 characters.
3. After 5 consecutive failed attempts, the account is locked for 15 minutes.
4. The error message does not reveal whether the email or the password is incorrect.
5. A "Remember me" checkbox keeps the session for 30 days.
6. A successful login redirects to the dashboard.
7. A "Forgot password" link is available.
