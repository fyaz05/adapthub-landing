name: WebMCP
description: Expose in-page tools to AI agents via the browser.

## Instructions
- Call document.modelContext.registerTool({ name, description, inputSchema, execute }) for each tool.
- inputSchema is a JSON Schema object. execute is an async callback returning the result.
- Register from client-side JavaScript on page load.
- See https://webmachinelearning.github.io/webmcp/.