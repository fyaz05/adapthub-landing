name: WebMCP
description: Expose in-page tools to AI agents via the browser.

## Instructions
- Call document.modelContext.registerTool({ name, description, inputSchema, execute }) for each tool.
- inputSchema is a JSON Schema object. execute is an async callback returning the result.
- Register from client-side JavaScript on page load.
- See https://webmachinelearning.github.io/webmcp/.

## AdaptHub implementation
Tools are registered on the homepage (https://adapthub.in) and run in-browser:
- search: full-site content search over the llms.txt index.
- get_page_content: markdown content of any AdaptHub page by path.
- get_docs_section: platform documentation by topic slug.
- get_blog_article: CAT strategy blog article by slug.
- get_study_resources: study resource listing by category.
- calculate_cat_percentile: indicative CAT percentile from raw score (0–198) and slot difficulty.
- simulate_adaptive_question: ZPD routing simulation for a section/topic/level.
- get_section_strategy: QA, DILR, or VARC strategy capsule.
- get_exam_pattern: CAT 2026 structure facts (66 questions, 198 marks, marking scheme).
