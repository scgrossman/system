#!/usr/bin/env node

// Usage: npm run scaffold <componentName>

/* eslint-disable no-console */

const { readFileSync, writeFileSync, mkdirSync } = require('fs')
const { resolve } = require('path')
const { camel, kebab } = require('case')

const componentName = process.argv[2]

if (!componentName) {
    console.error('Usage: node scaffold.js <componentName>')
    process.exit(1)
}

const basePath = `packages/${componentName}`
const storiesPath = `stories`

const scaffold = (template, destination) => {
    const contents = readFileSync(resolve(`scripts/scaffolding/${template}`), 'utf8')
        .replace(/\$COMPONENT\$/g, componentName)
        .replace(/\$COMPONENT_CAMEL\$/g, camel(componentName))
        .replace(/\$COMPONENT_KEBAB\$/g, kebab(componentName))

    writeFileSync(resolve(`${basePath}/${destination}`), contents)

    console.log(`Created ${basePath}/${destination}`)
}

const scaffoldStory = (template, destination) => {
    const contents = readFileSync(resolve(`scripts/scaffolding/${template}`), 'utf8')
        .replace(/\$COMPONENT\$/g, componentName)

    writeFileSync(resolve(`${storiesPath}/${destination}`), contents)

    console.log(`Created ${storiesPath}/${destination}`)
}

mkdirSync(resolve(basePath))
mkdirSync(resolve(`${basePath}/__tests__`))

scaffold('Component.js', `${componentName}.js`)
scaffold('Component.md', `${componentName}.md`)
scaffold('index.cjs.js', 'index.cjs.js')
scaffold('index.es.js', 'index.es.js')
scaffold('package.json', 'package.json')
scaffold('README.md', 'README.md')
scaffold('rollup.config.js', 'rollup.config.js')
scaffoldStory('Component.stories.js', `${componentName}.stories.js`);