# Evaluation of the AI output

## Review grid (score 1 to 5)

| Criterion | Question | v1 | v2 |
|---|---|---|---|
| Coverage | Are all acceptance criteria covered? | | |
| Boundary cases | 7/8 characters, 4th/5th/6th failed attempt? | | |
| Negative cases | Invalid data, empty fields, spaces, special characters? | | |
| Security | Injection, user enumeration, remember-me cookie? | | |
| Relevance | Duplicates or useless cases? | | |
| Accuracy | Invented or contradictory expected results? | | |
| Questions raised | Did the AI spot ambiguities? | | |

## Traps to check

- Is the failed-attempt counter reset after a successful login?
- How is the 15-minute unlock tested (time mock, API)?
- Email case sensitivity.
- Leading/trailing spaces in email or password.
- Does lockout also apply to an unknown email (enumeration risk)?
- Session duration, cookie flags (Secure, HttpOnly).
- Keyboard accessibility (Tab, Enter) and screen reader.
- "Forgot password" while the account is locked.

## Metrics

| Metric | Value |
|---|---|
| Manual cases (baseline) | |
| AI cases (v1) | |
| Valid as-is | |
| Needed correction | |
| Wrong / invented | |
| Found by AI, missed by me | |
| Found by me, missed by AI | |
| Time with AI | |
| Time without AI | |

## Conclusion (3 to 5 lines, in English)

