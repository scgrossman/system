import React from 'react';
import { storiesOf } from '@storybook/react';

import Heading from '@snweb/heading';

storiesOf('Headings', module).add('Article Headings', () => {
    return (
        <div>
            <Heading level="1">This is a level 1 heading</Heading>
            <Heading level="2">This is a level 2 heading</Heading>
            <Heading level="3">This is a level 3 heading</Heading>
            <Heading level="4">This is a level 4 heading</Heading>
        </div>
    )
});