# Issue #3: NPM Publishing Removal - Quick Reference

## Summary
Removed NPM publishing from js-playground project CI/CD pipeline. This is a static website, not an NPM package.

## Problem
- CI was failing trying to publish to NPM registry
- Error: `npm error 404 Not Found - PUT https://registry.npmjs.org/my-package`
- Project incorrectly configured as NPM package (inherited from template)

## Solution
✅ Removed NPM publishing steps from `.github/workflows/release.yml`
✅ Updated `package.json` to set `"private": true` and remove package-specific fields
✅ Fixed package metadata (name, description, repository URL)
✅ Created comprehensive case study with timeline and root cause analysis

## Files Changed
- `.github/workflows/release.yml` - Removed NPM publishing and OIDC auth
- `package.json` - Removed main/types/exports, set private:true
- `.changeset/remove-npm-publishing.md` - Added changeset for release notes
- `docs/case-studies/issue-3/analysis.md` - Detailed analysis and documentation

## Impact
- **Before**: CI failing on every push due to NPM 404 errors
- **After**: CI passes, only creates GitHub releases (no NPM publishing)
- **GitHub Pages**: Continues working correctly (unchanged)

## Key Learnings
1. Static websites should NOT be published to NPM
2. NPM is for reusable packages (libraries, tools, components)
3. GitHub Pages is for hosting static websites
4. Template projects need customization to match actual use case

## References
- Full Analysis: [analysis.md](./analysis.md)
- Issue: https://github.com/open-online-tools/js-playground/issues/3
- Pull Request: https://github.com/open-online-tools/js-playground/pull/4
- Failed CI Run: https://github.com/open-online-tools/js-playground/actions/runs/21001083330
