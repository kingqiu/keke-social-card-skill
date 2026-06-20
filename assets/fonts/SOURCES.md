# Font Sources

Bundled fonts are open-source fonts served by Google Fonts.

| Family | Files | License |
|---|---|---|
| Inter | `keke-inter/*.woff2` | SIL Open Font License 1.1 |
| Noto Sans SC | `keke-noto-sans-sc/*.woff2` | SIL Open Font License 1.1 |
| IBM Plex Mono | `keke-ibm-plex-mono/*.woff2` | SIL Open Font License 1.1 |
| Noto Serif SC | `keke-noto-serif-sc/*.woff2` | SIL Open Font License 1.1 |
| Playfair Display | `keke-playfair-display/*.woff2` | SIL Open Font License 1.1 |

These files are vendored as WOFF2 subsets so card rendering stays stable without network font loading while keeping the Skill package lightweight.

Regenerate subsets with:

```bash
npm run build:font-subsets
```

Use `PYFTSUBSET=/path/to/pyftsubset npm run build:font-subsets -- --remove-ttf` when rebuilding from source TTF files.
