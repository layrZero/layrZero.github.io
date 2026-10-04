# Protected-order documentation verification

Verified locally on 2026-10-05 for IMC feature commit `364acaf` and upcoming SDK 1.2.0 (migration baseline 1.1.5).

- `npm run typecheck`: passed.
- `npm run build`: passed with broken-link checking enabled. The initial new overview link was repaired; the final build had no broken links.
- `node scripts/verify-protected-release.mjs`: passed. Checks production broker links, Angel guide archival, retired URL redirects, published Dhan page, lifecycle route names, JSON examples and sitemap exclusion of disabled guides.
- Build advisory: existing Browserslist data is old; new files had no Git-derived update timestamp before commit. Dependencies were not upgraded.

The build is a local artifact. No GitHub Pages deployment, package publication, merge, push or live broker calls were performed. Live broker behavior and production access are implemented by IMC; documentation generation does not prove deployed behavior.
