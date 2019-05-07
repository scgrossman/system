import { configure } from '@storybook/react';
import { addParameters, addDecorator } from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import theme from './theme';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withInfo);

addParameters({
  options: {
    theme
  },
});

configure(loadStories,  module);