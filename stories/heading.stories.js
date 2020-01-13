import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import Heading from '@snweb/heading';

storiesOf('Heading', module).add('Heading component with text', () => <Heading>this is heading</Heading>);

