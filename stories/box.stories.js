import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import Box from '@rdmsystem/box';

storiesOf('Box', module).add('Box component with text', () => <Box>This is the box component</Box>);
storiesOf('Box', module).add('Box component with click', () => <Box onClick={() => console.log('hey')}>This is the box click</Box>);

