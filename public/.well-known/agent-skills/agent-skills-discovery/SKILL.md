name: Agent Skills Discovery Index
description: Advertise available agent skills.

## Instructions
- Serve /.well-known/agent-skills/index.json.
- Include a skills array; each entry: name, type, description, url, sha256.
- The sha256 must be the SHA-256 of the referenced SKILL.md.
- See https://github.com/cloudflare/agent-skills-discovery-rfc.
