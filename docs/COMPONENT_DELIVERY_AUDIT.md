# Component Delivery Audit

Generated: 2026-06-23

This audit records the current component delivery surface for the design system. It is generated from `figma/components.manifest.json` and should be read alongside `npm run verify`.

## Summary

- Components in manifest: 29
- React UI sources present: 29/29
- Vue SFC sources present: 29/29
- Web documentation pages present: 29/29
- Markdown handoff docs present: 29/29

## Delivery Matrix

Component | Route | React Source | Vue Source | Web Page | Markdown Doc | Variants | Tones | States | Page Lines
--- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---:
Button | /components/button | Yes | Yes | Yes | Yes | 4 | 7 | 6 | 1000
Icon | /components/icon | Yes | Yes | Yes | Yes | 2 | 7 | 5 | 1069
Input | /components/input | Yes | Yes | Yes | Yes | 3 | 0 | 8 | 172
Textarea | /components/textarea | Yes | Yes | Yes | Yes | 2 | 2 | 7 | 147
Form | /components/form | Yes | Yes | Yes | Yes | 4 | 5 | 6 | 217
DescriptionList | /components/description-list | Yes | Yes | Yes | Yes | 6 | 6 | 6 | 146
Collapse | /components/collapse | Yes | Yes | Yes | Yes | 2 | 2 | 6 | 154
Select | /components/select | Yes | Yes | Yes | Yes | 2 | 3 | 7 | 222
Tree | /components/tree | Yes | Yes | Yes | Yes | 2 | 2 | 6 | 124
Transfer | /components/transfer | Yes | Yes | Yes | Yes | 2 | 2 | 6 | 104
Table | /components/table | Yes | Yes | Yes | Yes | 5 | 5 | 9 | 292
Card | /components/card | Yes | Yes | Yes | Yes | 3 | 6 | 8 | 224
Menu | /components/menu | Yes | Yes | Yes | Yes | 3 | 2 | 7 | 146
Tabs | /components/tabs | Yes | Yes | Yes | Yes | 3 | 2 | 6 | 133
Modal | /components/modal | Yes | Yes | Yes | Yes | 5 | 4 | 5 | 197
Drawer | /components/drawer | Yes | Yes | Yes | Yes | 5 | 4 | 7 | 131
Radio | /components/radio | Yes | Yes | Yes | Yes | 3 | 3 | 6 | 122
Checkbox | /components/checkbox | Yes | Yes | Yes | Yes | 3 | 3 | 6 | 113
Tag | /components/tag | Yes | Yes | Yes | Yes | 3 | 11 | 4 | 272
Avatar | /components/avatar | Yes | Yes | Yes | Yes | 2 | 3 | 6 | 133
Badge | /components/badge | Yes | Yes | Yes | Yes | 3 | 6 | 4 | 134
Image | /components/image | Yes | Yes | Yes | Yes | 4 | 1 | 5 | 124
Breadcrumb | /components/breadcrumb | Yes | Yes | Yes | Yes | 3 | 2 | 5 | 140
Switch | /components/switch | Yes | Yes | Yes | Yes | 2 | 3 | 5 | 112
Pagination | /components/pagination | Yes | Yes | Yes | Yes | 5 | 2 | 5 | 106
Tooltip | /components/tooltip | Yes | Yes | Yes | Yes | 3 | 1 | 7 | 109
Popover | /components/popover | Yes | Yes | Yes | Yes | 4 | 2 | 7 | 133
Toast | /components/toast | Yes | Yes | Yes | Yes | 3 | 5 | 4 | 144
Empty | /components/empty | Yes | Yes | Yes | Yes | 7 | 4 | 3 | 152

## Verification

Run this command before handoff:

```bash
npm run verify
```

The verification gate checks component routes, sidebar entries, Markdown docs, React UI source exports, Vue SFC exports, and whether each component documentation page imports and uses the real UI component family.

## Current Handoff Notes

- Web docs are available through the `/components/*` routes.
- React source components live in `src/components/ui` and are exported from `src/components/ui/index.ts`.
- Vue source components live in `packages/vue-ui/src/components` and are exported from `packages/vue-ui/src/index.ts`.
- Figma handoff metadata lives in `figma/components.manifest.json`; actual Figma file synchronization should be done only after explicit authorization.
- Git commit, push, PR, and GitHub Pages deployment are intentionally not performed in this local preview iteration.
