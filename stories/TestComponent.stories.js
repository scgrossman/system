import React from 'react';
import { storiesOf } from '@storybook/react';

import TestComponent from "@snweb/test-component";

storiesOf('TestComponent', module).add('Component', () => {
    return (
        <div>
            <TestComponent />
        </div>
    )
});