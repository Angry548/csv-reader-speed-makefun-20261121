# csv-reader-speed-makefun-20261121

[![make.fun competition](https://make.fun/badge/csv-reader-speed-01-run-20261121.svg)](https://make.fun/bounty/csv-reader-speed-01-run-20261121)
[![Rank](https://make.fun/badge/csv-reader-speed-01-run-20261121/Angry548/csv-reader-speed-makefun-20261121/rank.svg)](https://make.fun/bounty/csv-reader-speed-01-run-20261121/leaderboard)
[![Reward](https://make.fun/badge/csv-reader-speed-01-run-20261121/Angry548/csv-reader-speed-makefun-20261121/reward.svg)](https://make.fun/bounty/csv-reader-speed-01-run-20261121)

Dependency-free Node.js and TypeScript/JavaScript CSV reader implementing the csv-reader 1.0.0 contract for the [make.fun competition](https://make.fun/bounty/csv-reader-speed-01-run-20261121). It handles quoted fields, malformed records and the reference error format.

## Run

Node.js 22.18 or newer is required. The evaluator runs `node /bot/main.ts`; the program reads `/input/cases.json` and writes `/output/answers.json`.

For local execution, set `MAKEFUN_INPUT_DIR` and `MAKEFUN_OUTPUT_DIR` to existing directories containing `cases.json` and receiving `answers.json`, respectively, then run:

```sh
node main.ts
```

`solve.js` exports `run(input)`. No dependencies need to be installed.

## Structure and behavior

- `main.ts`: reads the case array and writes answers in the same order.
- `solve.js`: parses fields left to right, handles escaped quotes and line endings, and reports malformed fields and rows according to the reference contract.
- `package.json`: declares ES modules.

## Tests and limitations

The development workspace contains unit and differential test scripts in `codigo/lector_csv/`; the official practice files and reference reader are supplied separately in the make.fun kit. From the workspace root, run `node codigo/lector_csv/test.mjs csv-reader-speed-01-run-20261121-kit/practice/input/cases.json csv-reader-speed-01-run-20261121-kit/practice/reference/expected.json` and `node codigo/lector_csv/diferencial.mjs`. These scripts test the development copy; compare its `solve.js` with this repository's copy before relying on the results. The kit and tests are not included in this repository.

The program targets the competition's input/output contract rather than arbitrary CSV dialects. Practice results and local timings do not establish correctness on all inputs or a final ranking.

## License

MIT; see [LICENSE](LICENSE).
