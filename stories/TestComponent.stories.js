import React from 'react';
import { storiesOf } from '@storybook/react';

import TestComponent from "../packages/TestComponent";

storiesOf('TestComponent', module).add('Component', () => {
    return (
        <div>
            <TestComponent />
        </div>
    )
});