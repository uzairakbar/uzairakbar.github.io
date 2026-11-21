---
katex: True
layout: post
category: notes
title: Introduction to variational inference
snippet: An introduction to variational inference.
tags: [data science]
published: false
---
- TOC
{:toc .toc}
---
## TODO

### Use KaTeX
```markdown
---
layout: post
title: KaTeX with Jekyll
katex: True
---
inline: $$f(x) = \int_{-\infty}^\infty \hat f(\xi)\,e^{2 \pi i \xi x} \,d\xi$$
display mode (centered):

$$f(x) = \int_{-\infty}^\infty \hat f(\xi)\,e^{2 \pi i \xi x} \,d\xi$$

```

And this gives:


> inline: $$f(x) = \int_{-\infty}^\infty \hat f(\xi)\,e^{2 \pi i \xi x} \,d\xi$$
>
> display mode (centered):
>
> $$f(x) = \int_{-\infty}^\infty \hat f(\xi)\,e^{2 \pi i \xi x} \,d\xi$$
>

Now if you toggle the `katex` property, you can see that the HTML symbols are created, but they will not load in $$\LaTeX$$ font.

### Fast $$\LaTeX$$ to $$\KaTeX$$ commands
There's a [quick list]( `https://katex.org/docs/supported.html`) and a [complete list](https://katex.org/docs/support_table.html) of supported functions.

Some of the canonical ones:
- Inline: `$x$` to `$$x$$` with no line spacing before or after (see above).
- Standalone: `$$f=ma$$` to `$$f=ma$$` with line spacing before and after (see above).
- Equation labeling: `\label{eq:test}` to `\tag{1}` (manually labeled equations)
- Haven't figured out how to do bibtex

### Notes

I first transcribe a $$\LaTeX$$ document into github-flavored markdown (GFM) using [pandoc](https://pandoc.org/):
```bash
pandoc -f latex -t markdown file.tex
```
This is really nice because it actually converts all of my custom macros into just plain latex, which is good enough most of the time.
However, the above modifications (inline, standalone, any labeling) will need to be made after the transcription in order for it to work with $$\KaTeX$$.

Things to edit after transcribing:
- Pandoc doesn't transcribe two of `^` in sequence well, but you can fix that manually.
- Pandoc adds an extra `\` at the end of a paragraph. This needs to be removed.
- Can remove the `\nonumber` attribute in equations.
- Equation referencing isn't available, therefore add appropriate `\tag{}` attributes and label them manually.
