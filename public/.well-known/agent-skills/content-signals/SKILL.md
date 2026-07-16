name: Content Signals
description: Declare AI content-usage preferences via robots.txt Content-Signal directives.

## Instructions
- Add Content-Signal: directives to robots.txt.
- Also send Content-Signal as an HTTP response header (same values) for agents that read headers instead of robots.txt.
- Supported keys: ai-train, search, ai-input. Values: yes / no.
- Example: Content-Signal: ai-train=yes, search=yes, ai-input=yes
- See https://contentsignals.org/.