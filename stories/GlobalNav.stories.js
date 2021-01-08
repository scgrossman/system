import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { storiesOf } from '@storybook/react';

//import GlobalNav from '@digitalmedia/global-nav';
import GlobalNav from "../packages/GlobalNav";

storiesOf('Navigation', module).add('Global Navigation', () => {
    return (
        <div>
            <link rel="stylesheet" type="text/css" media="all" href="https://int-www.sportsnet.ca/wp-content/themes/sportsnet-nhl/global.css"/>
            <link rel="stylesheet" type="text/css" media="all" href="https://int-www.sportsnet.ca/wp-content/themes/sportsnet-nhl/style.css"/>
            <Router>
                <Route path="/:sport?/:league?" component={GlobalNav} />
            </Router>
        </div>
    )
});