# AdaptHub Authentication

AdaptHub's app (app.adapthub.in) uses **Google sign-in** for human users — there is
no separate username/password account and no machine-to-machine (agent) OAuth or
API authentication.

## For people

1. Open the app at https://app.adapthub.in
2. Choose **Continue with Google**
3. Grant the requested Google profile scopes

That's the only sign-in method today. There is no client registration endpoint,
no token endpoint, and no agent `client_id`/`client_secret` flow.

## For AI agents

AdaptHub does **not** currently expose an authenticated API for agents. Agent
access to site content is provided read-only and unauthenticated via:

- `llms.txt` — a plain-text map of the site's markdown content
- `Accept: text/markdown` — HTML pages can be requested as Markdown
- WebMCP tools registered in the browser — search, page/docs/blog/content lookup
- Link headers advertising the resources above

If programmatic authenticated access becomes available later, this document and
the relevant `.well-known` files will be updated to describe it.
