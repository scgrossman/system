import React from 'react';
import { storiesOf } from '@storybook/react';

import $COMPONENT$ from "../packages/$COMPONENT$";

storiesOf('$COMPONENT$', module).add('Component', () => {
    return (
        <div>
            <$COMPONENT$ />
        </div>
    )
});