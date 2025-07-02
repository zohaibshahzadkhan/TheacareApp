Why we keep the full image instead of cropping to just the face:

Capturing the full image preserves maximum quality and flexibility for future processing, allowing backend or subsequent steps to perform precise face cropping or additional analysis without losing detail. It also simplifies debugging by retaining full context.

Trade-off for cropping only the face: While cropping reduces image size and potentially speeds up uploads and processing, it may lower image quality due to client-side resizing and limits flexibility for further analysis or adjustments if the crop is inaccurate.