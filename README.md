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

This will create a component in the packages directory with your specified Component name and will also create a story for the component in the stories directory.

&nbsp;

# Deploy
