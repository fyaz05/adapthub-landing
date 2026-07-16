name: Markdown for Agents
description: Negotiate text/markdown responses for AI agents.

## Instructions
- Detect Accept: text/markdown on incoming requests.
- Return a cleaned Markdown extraction of the page with Content-Type: text/markdown.
- Include an x-markdown-tokens header with the approximate token count.
- Keep HTML as the default response for browsers.
- See https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/.