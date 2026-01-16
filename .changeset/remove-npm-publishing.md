---
'js-playground': patch
---

Remove NPM publishing from CI/CD pipeline. This project is a static website hosted on GitHub Pages, not an NPM package. NPM publishing steps have been removed from the release workflow, and package.json has been updated to reflect the project's actual purpose as a static JavaScript playground.
