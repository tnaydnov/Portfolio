# Browser Coder: real local execution proof

Captured 12 September 2026 from the original application at [revision 7d3cae91](https://github.com/ninasokolov8/browser-coder/tree/7d3cae91ff9cc73001d7fcfa0aa3b315cebb2aeb).

- [Screenshot](browser-coder-python.png): 1440 x 900.
- [Recording](browser-coder-python.webm): 8.24 seconds, 1440 x 900, approximately 452 KB.
- [Sample program](sample.py): fictional, harmless data entered through the real editor.
- [Observed results](capture-report.json): visible output, API response statuses and browser errors.
- [Media metadata](media-metadata.json): decoded dimensions, duration and sizes.

The original Vite frontend and Node execution API ran locally, with Python 3.13.7. A fresh Chromium session selected Python and the existing Dark theme, entered the sample, clicked Run, and verified `Sum: 56` and exit 0. API responses were not mocked. The application code and its UI were not modified. The recording includes initial UI setup; it is a feasibility sample rather than the final case-study edit.

Two unrelated starter preloads (`asset/png` and `text/text`) returned 404. The Python starter, check and execution requests succeeded, and no browser page exception occurred. This capture verifies this Python flow only; other languages, debugger features and classroom integrations require their own runs.

The disposable capture used isolated storage and loopback services. The source repository and production service were left unchanged, and local capture servers were stopped afterward. The complete local startup/capture recipe remains in ignored `.qa/media-feasibility/browser-coder/` working notes; these portable files contain no credentials or private user data.
