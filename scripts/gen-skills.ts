import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const site = "https://adapthub.in";
const base = resolve(process.cwd(), "public/.well-known/agent-skills");

type Skill = {
  slug: string;
  type: string;
  name: string;
  description: string;
  body: string;
};

// Only skills that reflect capabilities AdaptHub actually implements today:
// content/LLM discovery (llms.txt, markdown negotiation, Link headers, WebMCP)
// and the content-signals robots directive. Auth/API/MCP/A2A/DNS discovery is
// NOT implemented (the app uses Google sign-in for humans only), so those
// skills are intentionally excluded.
const skills: Skill[] = [
  {
    slug: "link-headers-rfc8288",
    type: "discovery",
    name: "Link Headers (RFC 8288)",
    description:
      "Add Link response headers advertising agent-discovery resources (service-doc, describedby, auth-md).",
    body: `name: Link Headers (RFC 8288)
description: Advertise agent-discovery resources via HTTP Link response headers.

## Instructions
- Add a Link header on the homepage (and all HTML pages) pointing to well-known discovery resources.
- Use registered relation types: service-doc, describedby.
- Use custom relations for new standards: auth-md.
- Example: Link: </llms.txt>; rel="describedby"
- See https://www.rfc-editor.org/rfc/rfc8288 for the Link header format.`,
  },
  {
    slug: "markdown-for-agents",
    type: "content-negotiation",
    name: "Markdown for Agents",
    description:
      "Return a Markdown version of HTML responses when agents send Accept: text/markdown.",
    body: `name: Markdown for Agents
description: Negotiate text/markdown responses for AI agents.

## Instructions
- Detect Accept: text/markdown on incoming requests.
- Return a cleaned Markdown extraction of the page with Content-Type: text/markdown.
- Include an x-markdown-tokens header with the approximate token count.
- Keep HTML as the default response for browsers.
- See https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/.`,
  },
  {
    slug: "content-signals",
    type: "policy",
    name: "Content Signals",
    description:
      "Declare AI content-usage preferences (ai-train, search, ai-input) in robots.txt.",
    body: `name: Content Signals
description: Declare AI content-usage preferences via robots.txt Content-Signal directives.

## Instructions
- Add Content-Signal: directives to robots.txt.
- Supported keys: ai-train, search, ai-input. Values: yes / no.
- Example: Content-Signal: ai-train=no, search=yes, ai-input=yes
- See https://contentsignals.org/.`,
  },
  {
    slug: "agent-skills-discovery",
    type: "discovery",
    name: "Agent Skills Discovery Index",
    description:
      "Publish a skills discovery index at /.well-known/agent-skills/index.json.",
    body: `name: Agent Skills Discovery Index
description: Advertise available agent skills.

## Instructions
- Serve /.well-known/agent-skills/index.json.
- Include a skills array; each entry: name, type, description, url, sha256.
- The sha256 must be the SHA-256 of the referenced SKILL.md.
- See https://github.com/cloudflare/agent-skills-discovery-rfc.`,
  },
  {
    slug: "webmcp",
    type: "browser-integration",
    name: "WebMCP",
    description:
      "Expose site tools to browser AI agents via document.modelContext.registerTool().",
    body: `name: WebMCP
description: Expose in-page tools to AI agents via the browser.

## Instructions
- Call document.modelContext.registerTool({ name, description, inputSchema, execute }) for each tool.
- inputSchema is a JSON Schema object. execute is an async callback returning the result.
- Register from client-side JavaScript on page load.
- See https://webmachinelearning.github.io/webmcp/.`,
  },
];

const index = {
  skills: [] as Record<string, string>[],
};

for (const s of skills) {
  const dir = resolve(base, s.slug);
  mkdirSync(dir, { recursive: true });
  const file = resolve(dir, "SKILL.md");
  // Only create SKILL.md if it does not already exist, so hand-edits on disk
  // are preserved. The index.json is always regenerated from this metadata.
  if (!existsSync(file)) {
    writeFileSync(file, s.body, "utf8");
  }
  const contents = readFileSync(file, "utf8");
  const hash = createHash("sha256").update(contents, "utf8").digest("hex");
  index.skills.push({
    name: s.name,
    type: s.type,
    description: s.description,
    url: `${site}/.well-known/agent-skills/${s.slug}/SKILL.md`,
    sha256: hash,
  });
}

index.skills.sort((a, b) => a.name.localeCompare(b.name));
writeFileSync(
  resolve(base, "index.json"),
  JSON.stringify(index, null, 2),
  "utf8",
);

console.log(
  `Regenerated index.json (${skills.length} skills; SKILL.md files left untouched if present)`,
);
for (const sk of index.skills) {
  console.log(`${sk.name} -> ${sk.sha256}`);
}
