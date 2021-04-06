import React, { PureComponent } from 'react'
import { decodeEntities, removeDomain } from '../../utils/js/shared_helpers'
import LinkComponent from './LinkComponent'

import styles from './GlobalNav.module.scss';

class GlobalNavSubSecondaryMobile extends PureComponent {
    state = {
        open_desktop_subnav_item: null,
        mobile_more_sports_menu_open: false,
        mobile_more_menu_open: false,
        mobile_watch_menu_open: false,
        mobile_listen_menu_open: false,
    }

    toggleMobileMoreSportsMenu = () => {
        this.setState({
            mobile_more_sports_menu_open: !this.state.mobile_more_sports_menu_open,
        })
    }

    toggleMobileWatchMenu = () => {
        this.setState({
            mobile_watch_menu_open: !this.state.mobile_watch_menu_open,
        })
    }
    toggleMobileListenMenu = () => {
        this.setState({
            mobile_listen_menu_open: !this.state.mobile_listen_menu_open,
        })
    }

    toggleMobileMoreMenu = () => {
        this.setState({
            mobile_more_menu_open: !this.state.mobile_more_menu_open,
        })
    }

    handleSearchSubmit = (e) => {
        e.preventDefault()
        window.location.href = '/search/?s=' + this.state.query.replace(/\s+/g,'+')
    }

    desktopNavLinkNavigation = (url, nav_id, hasMenu) => {
        if (!url) return null

        // if desktop
        if (
            window.innerWidth >= this.props.desktopBreak ||
            (window.innerWidth >= this.props.tabletBreak &&
                window.innerWidth < this.props.desktopBreak &&
                !hasMenu)
        ) {
            if (url === '#') return null

            if (this.props.isReactUrl(url)) {
                this.props.history.push(url)
            } else {
                window.location.href = `${sn_url}${url}`
            }
        }

        this.openDesktopNavLinkNavigation(nav_id)
    }

    openDesktopNavLinkNavigation = nav_id => {
        // if tablet
        if (
            window.innerWidth >= this.props.tabletBreak &&
            window.innerWidth < this.props.desktopBreak
        ) {
            this.setState({
                open_desktop_subnav_item: this.state.open_desktop_subnav_item === nav_id ? null : nav_id,
            })
        }
    }

    closeDesktopNavLinkNavigation = () => {
        if (this.state.open_desktop_subnav_item) {
            this.setState({
                open_desktop_subnav_item: null,
            })
        }
    }

    render() {
        const {
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
        } = this.props

        const subnav_avail_class = subnav && subnav.length !== 0 && sport == 'videos' ? styles.active : ''

        const urlLocationArr = window.location.pathname.split('/')
        
        const { mobile_more_sports_menu_open, mobile_watch_menu_open, mobile_listen_menu_open, mobile_more_menu_open } = this.state

        return (
            <div
                className={`${styles.NavigationSub__cont} ${styles.pane} ${isLivetracker_class} ${isBasic_class} ${subnav_avail_class}`}
            >
                <div className={styles.inner_subnav_cont}>
                    <div id="subnav_scroller" className={styles.scroller}>
                    <ul className={`${styles.mobile_nav_link_list}`}>
                        {subnav && subnav.map((subnav_secondary, i) => {
                                const url_formatted = subnav_secondary.url && removeDomain(subnav_secondary.url)
                                const isLeagues = subnav_secondary.title === 'Leagues'
                                const isTeams = subnav_secondary.title === 'Teams'
                                const isShows = subnav_secondary.title === 'Shows'
                                const doReactPage = isReactUrl(url_formatted)
                                const proper_url = getReactWpUrl(url_formatted, doReactPage)
                                const hasSeperator = i === 0 && subnav.length > 1

                                return (
                                    <React.Fragment key={subnav_secondary.ID}>
                                        <li className={`${styles.mobile_nav_link_list_item}`}>
                                            {!isLeagues && !isTeams && !isShows &&  (
                                                <LinkComponent
                                                    url={proper_url}
                                                    withNavProps={withNavProps}
                                                    singlePageNavigation={doReactPage}
                                                    isNavLink
                                                    onClick={() => {
                                                        if (doReactPage) {
                                                            navMenuToggle()
                                                            modalMenuClose()
                                                        }
                                                    }}
                                                >
                                                    {subnav_secondary.title}
                                                </LinkComponent>
                                            )}
                                            {isLeagues && (
                                                <div onClick={this.toggleMobileWatchMenu}>
                                                    {subnav_secondary.title}
                                                    <span
                                                        className={`${mobile_watch_menu_open ? styles.active : ''}`}
                                                    />
                                                </div>
                                            )}
                                            {isTeams && (
                                                <div onClick={this.toggleMobileListenMenu}>
                                                    {subnav_secondary.title}
                                                    <span
                                                        className={`${mobile_listen_menu_open ? styles.active : ''}`}
                                                    />
                                                </div>
                                            )}
                                            {isShows && (
                                                <div onClick={this.toggleMobileMoreMenu}>
                                                    {subnav_secondary.title}
                                                    <span
                                                        className={`${mobile_more_menu_open ? styles.active : ''}`}
                                                    />
                                                </div>
                                            )}
                                            {hasSeperator && <div className={styles.sub_seperator} />}
                                        </li>
                                        {mobile_watch_menu_open &&
                                            isLeagues &&
                                            subnav_secondary.child_menu.length !== 0 && (
                                                <div className={`${styles.mobile_nav_secondary_list} ${
                                                    mobile_watch_menu_open ? styles.slideIn : styles.slideOut
                                                }`}>
                                                    <div className={`${styles.mobile_nav_secondary_back} ${styles.Navigation_chevron}`} onClick={this.toggleMobileWatchMenu}>Back</div>
                                                    {subnav_secondary.child_menu.map(more_child_item => {
                                                const url_formatted =
                                                    more_child_item.url &&
                                                    removeDomain(more_child_item.url)
                                                const doReactPage = isReactUrl(url_formatted)
                                                const proper_url = getReactWpUrl(
                                                    url_formatted,
                                                    doReactPage
                                                )

                                                return (
                                                    <li
                                                        className={`${styles.mobile_nav_link_list_item} ${styles.more}`}
                                                        key={more_child_item.ID}
                                                    >
                                                        <LinkComponent
                                                            url={proper_url}
                                                            withNavProps={withNavProps}
                                                            singlePageNavigation={doReactPage}
                                                            isNavLink
                                                            onClick={() => {
                                                                if (doReactPage) {
                                                                    navMenuToggle()
                                                                    modalMenuClose()
                                                                }
                                                            }}
                                                        >
                                                            {more_child_item.title}
                                                        </LinkComponent>
                                                    </li>
                                                )
                                            })}
                                                </div>
                                            )
                                        }
                                        {mobile_listen_menu_open &&
                                            isTeams &&
                                            subnav_secondary.child_menu.length !== 0 && (
                                                <div className={`${styles.mobile_nav_secondary_list} ${
                                                    mobile_listen_menu_open ? styles.slideIn : styles.slideOut
                                                }`}>
                                                    <div className={`${styles.mobile_nav_secondary_back} ${styles.Navigation_chevron}`} onClick={this.toggleMobileListenMenu}>Back</div>
                                                    {subnav_secondary.child_menu.map(more_child_item => {
                                                const url_formatted =
                                                    more_child_item.url &&
                                                    removeDomain(more_child_item.url)
                                                const doReactPage = isReactUrl(url_formatted)
                                                const proper_url = getReactWpUrl(
                                                    url_formatted,
                                                    doReactPage
                                                )

                                                return (
                                                    <li
                                                        className={`${styles.mobile_nav_link_list_item} ${styles.more}`}
                                                        key={more_child_item.ID}
                                                    >
                                                        <LinkComponent
                                                            url={proper_url}
                                                            withNavProps={withNavProps}
                                                            singlePageNavigation={doReactPage}
                                                            isNavLink
                                                            onClick={() => {
                                                                if (doReactPage) {
                                                                    navMenuToggle()
                                                                    modalMenuClose()
                                                                }
                                                            }}
                                                        >
                                                            {more_child_item.title}
                                                        </LinkComponent>
                                                    </li>
                                                )
                                            })}
                                                </div>
                                            )
                                        }
                                        {mobile_more_menu_open &&
                                            isShows &&
                                            subnav_secondary.child_menu.length !== 0 && (
                                                <div className={`${styles.mobile_nav_secondary_list} ${
                                                    mobile_more_menu_open ? styles.slideIn : styles.slideOut
                                                }`}>
                                                    <div className={`${styles.mobile_nav_secondary_back} ${styles.Navigation_chevron}`} onClick={this.toggleMobileMoreMenu}>Back</div>
                                                    {subnav_secondary.child_menu.map(more_child_item => {
                                                const url_formatted =
                                                    more_child_item.url &&
                                                    removeDomain(more_child_item.url)
                                                const doReactPage = isReactUrl(url_formatted)
                                                const proper_url = getReactWpUrl(
                                                    url_formatted,
                                                    doReactPage
                                                )

                                                return (
                                                    <li
                                                        className={`${styles.mobile_nav_link_list_item} ${styles.more}`}
                                                        key={more_child_item.ID}
                                                    >
                                                        <LinkComponent
                                                            url={proper_url}
                                                            withNavProps={withNavProps}
                                                            singlePageNavigation={doReactPage}
                                                            isNavLink
                                                            onClick={() => {
                                                                if (doReactPage) {
                                                                    navMenuToggle()
                                                                    modalMenuClose()
                                                                }
                                                            }}
                                                        >
                                                            {more_child_item.title}
                                                        </LinkComponent>
                                                    </li>
                                                )
                                            })}
                                                </div>
                                            )
                                        }
                                    </React.Fragment>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default GlobalNavSubSecondaryMobile
