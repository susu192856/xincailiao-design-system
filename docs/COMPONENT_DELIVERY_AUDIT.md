# Component Delivery Audit

Generated: 2026-07-10

This audit records the current component delivery surface for the design system. It is generated from `figma/components.manifest.json` and should be read alongside `npm run verify`.

## Summary

- Components in manifest: 32
- React UI sources present: 32/32
- Vue SFC sources present: 32/32
- Web documentation pages present: 32/32
- Markdown handoff docs present: 32/32

## Delivery Matrix

Component | Route | React Source | Vue Source | Web Page | Markdown Doc | Variants | Tones | States | Page Lines
--- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---:
Avatar | /components/avatar | Yes | Yes | Yes | Yes | 2 | 3 | 6 | 132
Badge | /components/badge | Yes | Yes | Yes | Yes | 3 | 6 | 4 | 133
Breadcrumb | /components/breadcrumb | Yes | Yes | Yes | Yes | 3 | 2 | 5 | 139
Button | /components/button | Yes | Yes | Yes | Yes | 4 | 7 | 6 | 693
Card | /components/card | Yes | Yes | Yes | Yes | 3 | 6 | 8 | 223
Chart | /components/chart | Yes | Yes | Yes | Yes | 10 | 10 | 5 | 683
Checkbox | /components/checkbox | Yes | Yes | Yes | Yes | 3 | 3 | 6 | 141
Collapse | /components/collapse | Yes | Yes | Yes | Yes | 2 | 2 | 6 | 120
DatePicker | /components/date-picker | Yes | Yes | Yes | Yes | 4 | 1 | 5 | 235
DescriptionList | /components/description-list | Yes | Yes | Yes | Yes | 6 | 6 | 6 | 302
Drawer | /components/drawer | Yes | Yes | Yes | Yes | 5 | 4 | 7 | 131
Empty | /components/empty | Yes | Yes | Yes | Yes | 7 | 4 | 3 | 151
Form | /components/form | Yes | Yes | Yes | Yes | 4 | 5 | 6 | 373
Icon | /components/icon | Yes | Yes | Yes | Yes | 2 | 7 | 5 | 774
Image | /components/image | Yes | Yes | Yes | Yes | 4 | 1 | 5 | 123
Input | /components/input | Yes | Yes | Yes | Yes | 3 | 0 | 8 | 485
Menu | /components/menu | Yes | Yes | Yes | Yes | 3 | 2 | 7 | 145
Modal | /components/modal | Yes | Yes | Yes | Yes | 5 | 4 | 5 | 196
Pagination | /components/pagination | Yes | Yes | Yes | Yes | 5 | 2 | 5 | 105
Popover | /components/popover | Yes | Yes | Yes | Yes | 4 | 2 | 7 | 132
Radio | /components/radio | Yes | Yes | Yes | Yes | 3 | 3 | 6 | 160
Select | /components/select | Yes | Yes | Yes | Yes | 2 | 0 | 7 | 551
Switch | /components/switch | Yes | Yes | Yes | Yes | 2 | 3 | 5 | 150
Table | /components/table | Yes | Yes | Yes | Yes | 5 | 5 | 9 | 358
Tabs | /components/tabs | Yes | Yes | Yes | Yes | 3 | 2 | 6 | 132
Tag | /components/tag | Yes | Yes | Yes | Yes | 3 | 11 | 4 | 271
Textarea | /components/input#textarea | Yes | Yes | Yes | Yes | 2 | 2 | 8 | 485
Toast | /components/toast | Yes | Yes | Yes | Yes | 3 | 5 | 4 | 143
Tooltip | /components/tooltip | Yes | Yes | Yes | Yes | 3 | 1 | 7 | 108
Transfer | /components/transfer | Yes | Yes | Yes | Yes | 2 | 2 | 6 | 103
Tree | /components/tree | Yes | Yes | Yes | Yes | 2 | 2 | 6 | 123
Upload | /components/upload | Yes | Yes | Yes | Yes | 3 | 2 | 6 | 206

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
- Git commit, push, PR, and GitHub Pages deployment are performed only after explicit user authorization.
