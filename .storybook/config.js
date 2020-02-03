import { configure } from '@storybook/react';
import { addParameters, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';
import theme from './theme';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withA11y);
addDecorator(withInfo);

addParameters({
  options: {
    theme
  },
});

configure(loadStories, module);