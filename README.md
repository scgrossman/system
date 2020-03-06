# SN Web Component Library

SN Web Component library was created to serve as a centralized place where our respective environments can pull from to acheive consistency across enviroments.

Components are built using [ReactJS](https://reactjs.org/) and compiled using [rollup.js](https://rollupjs.org/guide/en/).

We use [Storybook](https://storybook.js.org/) as a way to self document our component library.

https://ui.sportsnet.ca

&nbsp;

# Setup local environment

1. git clone git@github.com:digitalmedia/sn_web_components.git

2. In order to pull `@snweb` scoped packages you will need to [setup bintray](https://www.jfrog.com/confluence/display/BT/npm+Repositories) if you don't have a bintray account please contact simon.grossman@rci.rogers.com

3. If you have bintray properly setup you should be able to run `npm install` and all dependencies should resolve.

4. Start local developement enviroment by runnning `npm run dev` which will start a local storybook enviroment with live reload.

&nbsp;

# Create Component

1. `npm run scaffold YourComponentName`

This will create a component in the packages directory using the provided name and will also create a story for the component in the stories directory.

2. Then run `npm run dev` to view the newly created component

&nbsp;

# Deploy Package

Commit code using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#specification)

examples:

Feature commit message:

    feat(Header): add header component

Fix commit message:

    fix(Headder): hover colour

Once code has been commited run `npm run publish` this create the components changelog, updates the components version and then publishes to sn-web scoped packages on bintray. https://bintray.com/rdm/sn-web

# Deploy to ui.sportsnet.ca

If you've created a new package you will need to update the reference from the relative filepath in the components stories.js file to the published package

    import TestComponent from "../packages/TestComponent";

becomes

    import TestComponent from '@snweb/TestComponent';

Crete a PR to master, on merge to master ui.sportsnet.ca will be deployed.

