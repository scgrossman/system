import React from 'react'
import { removeDomain } from '../../utils/js/shared_helpers'
import LinkComponent from './LinkComponent'

import styles from './GlobalNav.module.scss';

const GlobalNavSub = ({
    isLivetracker_class,
    isBasic_class,
    subnav,
    isReactUrl,
    modalMenuClose,
    modalMenuToggle,
    pageTypeFromUrl,
    modal_menu_open,
    getReactWpUrl,
    withNavProps,
    sport,
}) => {
    const subnav_avail_class = subnav && subnav.length !== 0 ? styles.active : ''

    const urlLocationArr = window.location.pathname.split('/')

    // sport specific pages require extra active link styling logic around their varied url structures
    const isTournamentPage = urlLocationArr[2] === 'world-juniors'

    const isSportLeaguePage =
        (sport === 'juniors') &&
        !isTournamentPage &&
        urlLocationArr[2] &&
        urlLocationArr[2] !== 'scores' &&
        urlLocationArr[3] !== 'odds'

    const isSportScoresPage =
        (sport === 'soccer' || sport === 'juniors') &&
        !isTournamentPage &&
        urlLocationArr[2] &&
        urlLocationArr[2] === 'scores' &&
        urlLocationArr[3] !== 'odds' &&
        urlLocationArr[3] !== undefined

    const isSoccerOddsPage =
        sport === 'soccer' &&
        !isTournamentPage &&
        urlLocationArr[2] &&
        urlLocationArr[2] !== 'scores' &&``
        urlLocationArr[3] === 'odds'

    return (
        <div
            className={`${styles.NavigationSub__cont} ${isLivetracker_class} ${isBasic_class} ${subnav_avail_class}`}
        >
            <div className={styles.inner_subnav_cont}>
                <div id="subnav_scroller" className={styles.scroller}>
                    <ul>
                        {subnav.map((subnav_item, i) => {
                            const url_formatted = subnav_item.url && removeDomain(subnav_item.url)

                            const isHome = subnav_item.title.includes('Home');

                            const title_formatted =
                                subnav_item.title && subnav_item.title.replace('Home', '')

                            const isModal =
                                subnav_item.title === 'Teams' ||
                                subnav_item.title === 'Tables' ||
                                (subnav_item.title === 'Standings' && subnav_item.url === '#')
                            
                                const isPlayers = subnav_item.title === 'Players'	
                            
                            const isScores =	
                                subnav_item.title === 'Scoreboard' ||	
                                subnav_item.title === 'Fixtures' ||	
                                subnav_item.title === 'Scores/Schedules'	
                            const isOdds = subnav_item.title === 'Odds'

                            const doReactPage = isReactUrl(url_formatted)

                            const proper_url = getReactWpUrl(url_formatted, doReactPage)

                            const isStillActive =	
                                (!isModal && isPlayers && pageTypeFromUrl === 'players') ||	
                                (!isModal && isHome && pageTypeFromUrl === 'article') ||	
                                (!isModal && isScores && pageTypeFromUrl === 'scores') ||	
                                (!isModal && isScores && isSportScoresPage) ||	
                                (!isModal && isOdds && isSoccerOddsPage) ||	
                                (isModal && pageTypeFromUrl === 'teams') ||	
                                (isTournamentPage && subnav_item.title === 'World Juniors')		
                                    ? styles.active		
                                    : ''

                            const hasSeperator = i === 0 && subnav.length > 1

                            const modalMenuType =
                                subnav_item.title === 'Teams'
                                    ? 'teams'
                                    : subnav_item.title === 'Tables' ||
                                      (subnav_item.title === 'Standings' && subnav_item.url === '#')
                                    ? 'leagues'
                                    : null

                            const modalMenuTypeArg =
                                sport === 'soccer' || sport === 'juniors' ? sport : ''

                            const isExact =
                            sport === 'golf' || sport === 'tennis' || sport === 'auto-racing'
                                ? false
                                : true

                            return (
                                <li key={subnav_item.ID}>
                                    {!isModal && (
                                        <LinkComponent
                                            isExact={isExact}
                                            url={proper_url}
                                            onClick={modalMenuClose}
                                            className={isStillActive}
                                            singlePageNavigation={doReactPage}
                                            isNavLink
                                            withNavProps={withNavProps}
                                        >
                                            {title_formatted}
                                        </LinkComponent>
                                    )}
                                    {isModal && (
                                        <div
                                            className={isStillActive}
                                            onClick={() =>
                                                modalMenuToggle(modalMenuType, modalMenuTypeArg)
                                            }
                                        >
                                            {title_formatted}
                                            <span
                                                className={`${styles.Navigation_chevron_small} ${styles.teams_chevron} ${
                                                    modal_menu_open ? styles.active : ''
                                                }`}
                                            />
                                        </div>
                                    )}
                                    {hasSeperator && <div className={styles.sub_seperator} />}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default GlobalNavSub
