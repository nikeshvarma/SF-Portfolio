## Brief overview
- Project-specific rules for Salesforce LWC development using SLDS, aligned with this repository’s setup.
- Prioritize Lightning Web Components with strict SLDS styling, minimal custom CSS, and modern, modular composition.
- Always use Salesforce CLI `sf` commands and prefer MCP tools when available.

## Communication style
- Be concise and technical; avoid conversational filler.
- Summarize changes after each tool action and list impacted files.
- When ambiguity exists (e.g., deployment target org), ask a single, specific follow-up question.

## Development workflow
- Create modular LWCs with clear separation of concerns; parent comp composes child sections and passes data via public @api props.
- For changes, prefer targeted edits (replace_in_file) over whole-file rewrites (write_to_file) unless scaffolding a new file.
- Validate meta.xml and API version requirements before attempting deployment.
- Use `sf deploy metadata` for deployments; avoid deprecated `sfdx` commands.

## Coding best practices
- Use only LWC (no Aura) and Lightning Base Components (e.g., lightning-card, lightning-button, lightning-icon).
- Style with SLDS classes (grid, spacing, typography). Keep custom CSS minimal for polish (shadows, gradients, hover).
- Ensure mobile-responsive design using SLDS responsive utilities (e.g., slds-medium-size_1-of-2, slds-large-size_1-of-3).
- Keep JS simple and declarative; derive UI from inputs; avoid DOM hacks; use template refs and standard events where needed.

## API versioning
- Always set apiVersion 65.0 in all LightningComponentBundle meta.xml files (new and edited).
- When encountering existing components, upgrade meta.xml apiVersion to 65.0 as part of the change set.
- If a platform feature requires a higher version, request explicit approval before deviating.

## SLDS usage
- Prefer SLDS layout utilities: slds-grid, slds-wrap, slds-gutters, slds-p-around_*, slds-m-*.
- Typography: slds-text-heading_*, slds-text-title, slds-text-title_caps, and standard text tokens.
- Color and theme: favor Salesforce blue accents (#0070d2) and neutral backgrounds (white/light gray).
- Accessibility: include alternative-text on icons and aria-labels on decorative/semantic elements where applicable.

## Naming conventions
- LWC bundles: camelCase for folders/files (e.g., portfolioLanding, portfolioProjects).
- JS classes: PascalCase matching folder name (e.g., class PortfolioLanding).
- Public properties with @api are lowerCamelCase; boolean names use “is/has/should” prefixes.

## Testing and validation
- Run local linters and ensure HTML/JS/CSS parse clean (no schema or CSS parse errors).
- Validate responsive behavior visually: 1-up on small screens, 2-up medium where applicable, 3-up large for grids.
- After changes, confirm meta.xml structure and targets are valid.

## Deployment and ops
- Prefer MCP Salesforce CLI tools if available; otherwise use `sf` CLI.
- Typical command: `sf deploy metadata -p force-app` or specify bundles with `-m LightningComponentBundle:Name`.
- Document any post-deploy steps (e.g., add component to App Page, assign tab).

## Documentation notes
- Include brief README per entry/parent component describing composition, usage, and deployment snippet.
- Avoid verbose narrative; focus on how to use and configure data (props like email, links, arrays).
