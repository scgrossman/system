# SN Web Component Library

1. `npm install` (since our components are not stored anywhere, `@snweb/box` and `@snweb/header` will fail)

2. cd into `node_modules` and run `npm link @sn/box` and `npm link @snweb/header` (creates symlink to local components)

3. start storybook and watch components for live-reloading `npm run dev`

4. to commit a change, follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/) guideline. example `feat(Box): update hover colour` or `fix(Box): fix prop type` etc.

5. to generate changelog, version bump and tag run `npm run pre-publish`


### Todo:

- setup npm publish
- eslint setup
- command to scaphold new component



