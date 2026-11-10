# Gunner Thompson — Cloud AI Upgrade (Phase 1)

This is a **development-only** integration plan. Existing live pages are unchanged.

## Architecture
- Frontend: Blackcell website, passing a narrow, consented page-context snapshot.
- Authenticated backend: validates user JWT, enforces permissions, rate limits, and routes chat requests.
- Inference: existing Dolphin model on RunPod. Keep RunPod credentials on the server, never in HTML.
- Memory: Supabase tables with owner-scoped row-level security.
- Tools: initially read-only page-context; later browser, image, code and approved actions.
- Changes to website/code: preview/test first, human approval before production deployment.
- Budget: target $160/month; application-level thresholds at $150/$175/$195; provider billing alerts separately.

## Phase 1 data contract
```json
{
  "page": {
    "title": "Network",
    "path": "/network",
    "url_origin": "https://example.com",
    "visible_text": "Sanitized visible page text, maximum 6000 chars",
    "selected_item": null
  },
  "chat": {"message": "What do you think of this page?"}
}
```

## Security constraints
- Never transmit passwords, access codes, API keys, session tokens, private forms, or hidden DOM content.
- Require user authentication and explicit authorization for private pages.
- Do not give Dolphin raw database credentials or unrestricted browser access.
- Keep conversation history private, encrypted in transit, and owner-scoped.
- Run all self-modification proposals in a separate branch or sandbox.
- Keep zero-worker idle behavior and test cold-start delays.

## Next implementation
Identify the exact production page that embeds Gunner, its chat handler, the Supabase Edge Function that proxies RunPod, and the existing Dolphin model/endpoint configuration. Then add a secure page-context message to that handler without changing the approved visual design.
