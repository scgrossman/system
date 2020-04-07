import React from 'react';
import { storiesOf } from '@storybook/react';

import GlobalNav from "../packages/GlobalNav";

storiesOf('GlobalNav', module).add('Component', () => {
    return (
        <div>
            <link rel="stylesheet" type="text/css" media="all" href="https://int-www.sportsnet.ca/wp-content/themes/sportsnet-nhl/global.css"/>
            <link rel="stylesheet" type="text/css" media="all" href="https://int-www.sportsnet.ca/wp-content/themes/sportsnet-nhl/style.css"/>
            <GlobalNav env="int" />
        </div>
    )
});