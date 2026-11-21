# uzairakbar.com

My homepage and study notes, built with [Zola](https://www.getzola.org) and
the [Camera Ready](https://github.com/uzairakbar/camera-ready) theme.

| To change | Edit |
|---|---|
| Bio | `content/_index.md` |
| News | `data/news.toml` |
| Publications | `data/publications.bib` |
| Co-author links | `data/authors.toml` |
| Software cards | `data/projects.toml` |
| Experience, teaching, services | `data/misc.toml` |
| Notes | `content/notes/` |
| Name, menu, links, options | `zola.toml` |

`drafts/` holds unpublished notes from the old Jekyll site, in their original
format. They are not built.

## Preview

```sh
git submodule update --init
zola serve
```

## Deploy

Pushing to `main` builds and publishes the site through GitHub Actions.

To update the theme: `git submodule update --remote themes/camera-ready`.
