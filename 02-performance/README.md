# Performance tests with k6

Load tests written in JavaScript with k6, run against the public k6 demo site
(https://test.k6.io). Only demo sites made for load testing are used.

## Files

| File | Purpose |
|---|---|
| `k6/first-test.js` | Minimal test: one GET request and a 1 s pause |
| `k6/second-test.js` | Test with stages, checks, thresholds, groups and a custom metric |
| `k6/rapport-k6.html` | HTML report exported by k6 |

## Scenario

Each virtual user opens the home page, waits 1 second, opens the contacts page,
then waits a random time between 1 and 3 seconds.

## Load profile

| Stage | Duration | Virtual users |
|---|---|---|
| Ramp-up | 20 s | 0 to 5 |
| Plateau | 40 s | 5 |
| Ramp-down | 10 s | 5 to 0 |

## Thresholds

- Failed requests: less than 1 %
- Response time: p(95) under 1000 ms
- Checks passed: more than 99 %

## Results

| Metric | Value |
|---|---|
| Total requests | 100 |
| Average response time | 3.44 ms |
| p(95) response time | 4.31 ms |
| Error rate | 0 % |
| Thresholds |passed|

## Conclusion

FILL (2 lines in English)

## How to run

k6 run second-test.js
