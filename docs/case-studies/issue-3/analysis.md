# Case Study: Issue #3 - Removing NPM Publishing from Static Website Project

## Executive Summary

This case study analyzes Issue #3 in the js-playground repository, where NPM publishing was inappropriately configured for a static website project. The issue resulted in failed CI/CD builds due to attempting to publish a static website to the NPM registry.

**Key Finding**: The project is a static JavaScript playground hosted on GitHub Pages and should not be published to NPM, as it is not a reusable library or CLI tool.

## Timeline of Events

### 2026-01-14 16:10:00 UTC - Initial CI Run Started
- GitHub Actions workflow triggered on push to main branch
- Workflow: `release.yml` (Checks and release)
- Commit SHA: `9b37c5ee9fb34fb3833928af591cec3516312a9e`

### 2026-01-14 16:10:01 - 16:10:21 UTC - Detection and Testing Phase
- **Detect Changes job**: Successfully detected changes in code files
  - Changes included: `.github/workflows/pages.yml`, `app/*`, `docs/*`, `package.json`
  - Output: `any-code-changed=true`
- **Lint and Format Check job**: ✅ Passed successfully
  - ESLint: Passed
  - Prettier format check: Passed
  - Code duplication check: Passed
- **Test jobs**: ✅ All 9 test matrix jobs passed
  - Node.js on Ubuntu, macOS, Windows: Passed
  - Bun on Ubuntu, macOS, Windows: Passed
  - Deno on Ubuntu, macOS, Windows: Passed

### 2026-01-14 16:13:52 - 16:13:55 UTC - Release Job Failed
- **Release job** attempted to publish to NPM registry
- **Error encountered**: `npm error 404 Not Found - PUT https://registry.npmjs.org/my-package`
- **Root cause**: Package `my-package@0.5.0` does not exist on NPM registry
- **Secondary issue**: Access token expired or revoked

## Root Cause Analysis

### Primary Root Cause
The project was configured with NPM publishing workflow steps (`release.yml`) despite being a static website application. The codebase structure reveals:

1. **Project Type**: Static JavaScript playground with React UI
   - Located in `app/` directory (Vite + React application)
   - Built output goes to `docs/` for GitHub Pages deployment
   - No reusable library code in `src/` or exports in `package.json`

2. **Mismatched Configuration**:
   - `package.json` configured as NPM package with `main`, `types`, and `exports` fields
   - These fields point to `src/index.js` which is not the purpose of this project
   - Package name: `my-package` - generic placeholder name, never published to NPM

### Secondary Issues
1. **NPM Authentication**: Token expired/revoked warnings
2. **Package Metadata**: Missing `.npmignore`, generic package name
3. **Repository URL**: Points to template repository, not the actual project

## Error Details from CI Logs

```
npm error code E404
npm error 404 Not Found - PUT https://registry.npmjs.org/my-package - Not found
npm error 404 The requested resource 'my-package@0.5.0' could not be found
or you do not have permission to access it.

🦋  error an error occurred while publishing my-package: E404 Not Found -
PUT https://registry.npmjs.org/my-package - Not found
```

## Impact Assessment

### Build Pipeline Impact
- ❌ Release workflow failing on every main branch push
- ✅ GitHub Pages deployment (separate workflow) continues to work
- ✅ Tests and linting passing successfully
- ⚠️  Failed CI status blocks merge confidence

### User Impact
- GitHub Pages site remains functional: https://open-online-tools.github.io/js-playground/
- No user-facing service interruption
- Developer experience affected by red CI badges

## NPM Registry vs GitHub Pages: Technical Analysis

### NPM Registry Purpose
NPM (Node Package Manager) registry is designed for:
- **Reusable code packages**: Libraries, frameworks, utilities
- **Developer tools**: CLI applications, build plugins
- **Components**: React/Vue/Angular components
- **Dependencies**: Code that other projects `npm install`

### GitHub Pages Purpose
GitHub Pages is designed for:
- **Static websites**: HTML, CSS, JavaScript files
- **Documentation sites**: Project docs, API references
- **Demo applications**: Interactive web apps
- **Portfolios**: Personal or project landing pages

### Project Classification
**js-playground** is clearly a GitHub Pages project because:
1. ✅ Interactive web application (JavaScript playground with REPL)
2. ✅ Built with Vite for static file generation
3. ✅ Output deployed to `docs/` folder for Pages
4. ✅ No exported modules for consumption by other packages
5. ❌ Not a library (no reusable code exports)
6. ❌ Not a CLI tool (no bin commands)

## Proposed Solution

### 1. Remove NPM Publishing Steps
**File**: `.github/workflows/release.yml`

Remove or comment out:
- "Publish to npm" step (line 250-254)
- "Update npm for OIDC trusted publishing" step (line 232-233)
- NPM-related permissions (`id-token: write` for OIDC)

### 2. Update Package.json
**File**: `package.json`

Remove NPM-specific fields:
- `main` - entry point for NPM packages
- `types` - TypeScript definitions
- `exports` - modern exports map
- Update `name` to match actual project
- Fix `repository.url` to point to correct repo

### 3. Keep GitHub Pages Workflow
**File**: `.github/workflows/pages.yml`

✅ No changes needed - this workflow correctly deploys static files to Pages

### 4. Update Documentation
- Add clarification in README about project type
- Document that this is a static site, not an NPM package
- Remove any references to NPM publishing from contributing docs

## Alternative Approaches Considered

### Option A: Publish to NPM (Rejected)
**Reasoning**: Would require restructuring the entire project to export reusable modules. The playground application is not designed as a library.

### Option B: Dual Publishing (Rejected)
**Reasoning**: Even if we extracted reusable components, the primary purpose is the web app. This would add unnecessary complexity.

### Option C: Remove NPM Publishing (✅ Recommended)
**Reasoning**: Aligns with actual project purpose, simplifies CI/CD, focuses on GitHub Pages deployment.

## Prevention Strategies

### Template Selection
- Use appropriate starter templates:
  - For NPM packages: Use library templates
  - For static sites: Use GitHub Pages templates
- Review template contents before initializing

### CI/CD Design
- Workflow should match deployment target
- Separate workflows for different deployment types
- Clear workflow naming (e.g., `pages.yml` vs `release.yml`)

### Code Review Checkpoints
- Verify `package.json` fields match project type
- Ensure CI/CD workflows target correct platforms
- Check that build outputs align with deployment destination

## Lessons Learned

1. **Project Type Matters**: Template-based projects need customization to match actual use case
2. **Workflow Separation**: GitHub Pages and NPM publishing are separate concerns
3. **Early Detection**: Failed deployments to wrong targets should be caught in initial setup
4. **Documentation**: Clear project purpose prevents configuration mismatches

## References and Research

### Technical Documentation
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [NPM Publishing Guide](https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages)
- [Configuring Publishing Source for GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

### When to Use NPM vs GitHub Pages
- **NPM Registry**: For distributing installable packages that other developers import
- **GitHub Pages**: For hosting accessible websites that users visit in browsers
- **Both Together**: Library published to NPM + documentation site on Pages

### Related Resources
- [gh-pages npm package](https://www.npmjs.com/package/gh-pages) - Tool for deploying to Pages
- [Static Site Generators](https://kinsta.com/blog/static-site-generator/) - Overview of static site options
- [GitHub Actions for Pages](https://github.com/peaceiris/actions-gh-pages) - Deployment automation

## Conclusion

The root cause of Issue #3 is a fundamental mismatch between project type (static website) and deployment configuration (NPM publishing). The solution is to remove NPM publishing from the CI/CD pipeline and rely solely on GitHub Pages deployment, which is already working correctly.

**Recommendation**: Remove all NPM publishing steps from `release.yml` and update package metadata to reflect the project's actual purpose as a static website playground.

---

**Case Study Prepared**: 2026-01-16
**Issue Reference**: [#3](https://github.com/open-online-tools/js-playground/issues/3)
**CI Run Reference**: [#21001083330](https://github.com/open-online-tools/js-playground/actions/runs/21001083330)
