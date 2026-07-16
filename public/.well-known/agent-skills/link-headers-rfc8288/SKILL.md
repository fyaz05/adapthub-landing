name: Link Headers (RFC 8288)
description: Advertise agent-discovery resources via HTTP Link response headers.

## Instructions
- Add a Link header on the homepage (and all HTML pages) pointing to well-known discovery resources.
- Use registered relation types: service-doc, describedby.
- Use custom relations for new standards: auth-md.
- Example: Link: </llms.txt>; rel="describedby"
- See https://www.rfc-editor.org/rfc/rfc8288 for the Link header format.
