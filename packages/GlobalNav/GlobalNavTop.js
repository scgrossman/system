import React, { PureComponent } from 'react'
import { decodeEntities, removeDomain } from '../../utils/js/shared_helpers'
import LinkComponent from './LinkComponent'

import styles from './GlobalNav.module.scss';

class GlobalNavTop extends PureComponent {
    state = {
        open_desktop_nav_item: null,
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
                open_desktop_nav_item: this.state.open_desktop_nav_item === nav_id ? null : nav_id,
            })
        }
    }

    closeDesktopNavLinkNavigation = () => {
        if (this.state.open_desktop_nav_item) {
            this.setState({
                open_desktop_nav_item: null,
            })
        }
    }

    render() {
        const {
            isFetching_nav,
            isLivetracker_class,
            isBasic_class,
            menu_collapsed_class,
            nav,
            isReactUrl,
            navMenuToggle,
            modalMenuClose,
            modalMenuToggle,
            getReactWpUrl,
            withNavProps
        } = this.props

        return (
            <div className={`${styles.NavigationTop__cont} ${styles.loaded_nav} ${isLivetracker_class} ${isBasic_class} is_sticky`} id="nav-sticky">
                <div className={styles.top_nav_bar}>
                    <button className={`${styles.burger} ${menu_collapsed_class}`}>
                        <div className={styles.burger_cont} onClick={navMenuToggle}>
                            <div className={`${styles.top} ${menu_collapsed_class}`} />
                            <div className={`${styles.middle} ${menu_collapsed_class}`} />
                            <div className={`${styles.bottom} ${menu_collapsed_class}`} />
                        </div>
                    </button>

                    <a href="https://www.sportsnet.ca">
                        <img
                            className={styles.sn_logo_nav_mobile}
                            src="https://www.sportsnet.ca/wp-content/themes/sportsnet-nhl/images/logo-sn.svg"
                            alt="Sportsnet Logo"
                            title="Sportsnet"
                        />
                    </a>

                    <div className={`${styles.janrain_mobile_icon}`}>
                        <button
                            id="captureSignInLink"
                            className={`captureSignInLink capture_modal_open ${styles.janrain_mobile_icon_btn}`}
                            style={{ display: 'block' }}
                        >
                            <div className={styles.janrain_mobile_profile_icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{fill:'none'}}> <defs> <clipPath id="a"> <circle class="a" cx="12" cy="12" r="12" transform="translate(-1854 840)" style={{fill:'none'}}/> </clipPath> </defs> <g transform="translate(1866 -828)" clip-path="url(#a)"> <g class="c" stroke-width="1.5px" transform="translate(-1854 855)" style={{fill:'none',stroke:'#fff'}}> <circle class="d" cx="12" cy="12" r="12" style={{stroke:'none'}}/> <circle class="a" cx="12" cy="12" r="11.25" style={{fill:'none'}}/> </g> <g class="c" stroke-width="1.5px" transform="translate(-1847 844)" style={{fill:'none',stroke:'#fff'}}> <circle class="d" cx="5" cy="5" r="5" style={{stroke:'none'}}/> <circle class="a" cx="5" cy="5" r="4.25" style={{fill:'none'}}/> </g> <g class="c" stroke-width="1.5px"transform="translate(-1854 840)" style={{fill:'none',stroke:'#fff'}}> <circle class="d" cx="12" cy="12" r="12" style={{stroke:'none'}}/> <circle class="a" cx="12" cy="12" r="11.25" style={{fill:'none'}}/> </g> </g> <path class="a" d="M0 0h48v48H0z"/> </svg>
                            </div>
                        </button>
                    </div>

                    <div className={styles.livetracker_text}>Live Tracker</div>

                    {/* <div className={styles.video_text}>
                        <a href="https://www.sportsnet.ca/videos/">Video</a>
                    </div> */}

                    <div id="sponsor_00" className={styles.snSponsorAd} />

                    <div className={styles.desktop_nav}>
                        <ul className={styles.desktop_nav_link_list}>
                            {Object.keys(nav).length !== 0 &&
                                nav.left.map(left_item => {
                                    const url_formatted =
                                        left_item.url && removeDomain(left_item.url)
                                    const isOpenSubMenu =
                                        this.state.open_desktop_nav_item === left_item.ID
                                    const hasChildMenu =
                                        left_item.child_menu && left_item.child_menu.length !== 0
                                    const hasTeamsData =
                                        left_item.teams_data && left_item.teams_data.length !== 0
                                    const isMore = left_item.title === 'More'

                                    return (
                                        <li
                                            className={`${styles.desktop_nav_link_item} ${
                                                isOpenSubMenu ? styles.open_submenu : ''
                                            }`}
                                            key={left_item.ID}
                                        >
                                            <div
                                                className={styles.desktop_nav_link_item_link}
                                                onClick={() =>
                                                    this.desktopNavLinkNavigation(
                                                        url_formatted,
                                                        left_item.ID,
                                                        hasChildMenu
                                                    )
                                                }
                                            >
                                                {left_item.title}
                                                {isMore && (
                                                    <div className="Navigation_chevron desktop_more_chevron" />
                                                )}
                                            </div>
                                            {hasChildMenu && (
                                                <div className={styles.desktop_nav_link_menu_container}>
                                                    <ul
                                                        id={`desktop_nav_link_menu_${left_item.ID}`}
                                                        className={styles.desktop_nav_link_menu}
                                                    >
                                                        <div className={styles.desktop_nav_link_menu_left}>
                                                        {left_item.child_menu.map(left_child_item => {
                                                            const url_formatted_child =
                                                                left_child_item.url &&
                                                                removeDomain(left_child_item.url)

                                                            let modalType = ''
                                                            if (left_child_item.title === 'Teams') {
                                                                modalType = 'teams'
                                                            } else if (
                                                                left_child_item.title === 'Tables'
                                                            ) {
                                                                modalType = 'leagues'
                                                            }

                                                            const doReactPage = isReactUrl(
                                                                url_formatted_child
                                                            )
                                                            const proper_url = getReactWpUrl(
                                                                url_formatted_child,
                                                                doReactPage
                                                            )

                                                            return (
                                                                <li
                                                                    className={styles.desktop_nav_link_menu_item}
                                                                    key={left_child_item.ID}
                                                                >
                                                                    {!modalType && (
                                                                        <LinkComponent
                                                                            className={styles.desktop_nav_link_menu_item_link}
                                                                            withNavProps={withNavProps}
                                                                            url={proper_url}
                                                                            singlePageNavigation={doReactPage}
                                                                            isNavLink
                                                                            onClick={() => {
                                                                                if (doReactPage) {
                                                                                    modalMenuClose()
                                                                                    this.closeDesktopNavLinkNavigation()
                                                                                }
                                                                            }}
                                                                        >
                                                                            {left_child_item.title}
                                                                        </LinkComponent>
                                                                    )}
                                                                    {modalType && (
                                                                        <div
                                                                            className={styles.desktop_nav_link_menu_item_link}
                                                                            onClick={() => {
                                                                                modalMenuToggle(
                                                                                    modalType,
                                                                                    left_item.title.toLowerCase()
                                                                                )
                                                                                this.closeDesktopNavLinkNavigation()
                                                                            }}
                                                                        >
                                                                            {left_child_item.title}
                                                                        </div>
                                                                    )}
                                                                </li>
                                                            )
                                                        })}
                                                        </div>
                                                        <div className={styles.desktop_nav_link_menu_right}>
                                                        {hasTeamsData && (
                                                            <div className={styles.desktop_nav_teams_panel}>
                                                                {Object.keys(left_item.teams_data).map(conference => {
                                                                    return (
                                                                        <div>
                                                                            <div className={styles.desktop_nav_teams_panel_conference_name}>{conference}</div>
                                                                            <div className={styles.desktop_nav_teams_panel_conference}>
                                                                                {Object.keys(left_item.teams_data[conference]).map(division => {
                                                                                    return (
                                                                                        <div className={styles.desktop_nav_teams_panel_column}>
                                                                                            <div className={styles.desktop_nav_teams_panel_division_title}>{division}</div>
                                                                                            {left_item.teams_data[conference][division].map(team => {
                                                                                                return (
                                                                                                    <div>
                                                                                                        <a href={`/${team.league}/teams/${team.team_slug}`}>
                                                                                                            <div className={styles.desktop_nav_teams_panel_item_link}>
                                                                                                                <img className={styles.desktop_nav_teams_panel_item_team_logo} src={team.team_image_url}/>
                                                                                                                <div className={styles.desktop_nav_teams_panel_item_team_name}>{team.team_name}</div>
                                                                                                            </div>
                                                                                                        </a>
                                                                                                    </div>
                                                                                                )
                                                                                            })}
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        )}
                                                        </div>
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    )
                                })}
                        </ul>

                        <ul className={`${styles.desktop_nav_link_list} ${styles.right}`}>
                            {Object.keys(nav).length !== 0 &&
                                nav.right.map(right_item => {
                                    if (right_item.title === 'Watch Live') return ''

                                    const url_formatted =
                                        right_item.url && removeDomain(right_item.url)
                                    const isOpenSubMenu =
                                        this.state.open_desktop_nav_item === right_item.ID
                                    const title =
                                        right_item.title === 'Miscl'
                                            ? decodeEntities('&bull;&bull;&bull;')
                                            : right_item.title
                                    const remove_at_tablet_class =
                                        right_item.title !== 'Miscl' ? 'tablet_remove' : ''
                                    const hasChildMenu =
                                        right_item.child_menu && right_item.child_menu.length !== 0

                                    return (
                                        <li
                                            className={`${styles.desktop_nav_link_item} ${styles.right} ${remove_at_tablet_class} ${
                                                isOpenSubMenu ? 'open_submenu' : ''
                                            }`}
                                            key={right_item.ID}
                                        >
                                            <div
                                                className={styles.desktop_nav_link_item_link}
                                                onClick={() =>
                                                    this.desktopNavLinkNavigation(
                                                        url_formatted,
                                                        right_item.ID,
                                                        hasChildMenu
                                                    )
                                                }
                                            >
                                                {title}
                                            </div>
                                            {hasChildMenu && (
                                                <ul className={styles.desktop_nav_link_menu}>
                                                    {right_item.child_menu.map(right_child_item => {
                                                        const url_formatted_child =
                                                            right_child_item.url &&
                                                            removeDomain(right_child_item.url)
                                                        const doReactPage = isReactUrl(
                                                            url_formatted_child
                                                        )
                                                        const proper_url = getReactWpUrl(
                                                            url_formatted_child,
                                                            doReactPage
                                                        )

                                                        return (
                                                            <li
                                                                className={styles.desktop_nav_link_menu_item}
                                                                key={right_child_item.ID}
                                                            >
                                                                <LinkComponent
                                                                    className={styles.desktop_nav_link_menu_item_link}
                                                                    url={proper_url}
                                                                    withNavProps={withNavProps}
                                                                    singlePageNavigation={doReactPage}
                                                                    isNavLink
                                                                    onClick={() => {
                                                                        if (doReactPage) {
                                                                            modalMenuClose()
                                                                            this.closeDesktopNavLinkNavigation()
                                                                        }
                                                                    }}
                                                                >
                                                                    {right_child_item.title}
                                                                </LinkComponent>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            )}
                                        </li>
                                    )
                                })}
                            <li className={`${styles.desktop_nav_link_item} ${styles.watch_live}`}>
                                <a href="https://now.sportsnet.ca/">
                                    <div className={styles.desktop_nav_link_item_link}>LIVE</div>
                                </a>
                            </li>
                            <li className={`${styles.desktop_nav_link_item} ${styles.search_btn}`}>
                                <div className={styles.desktop_nav_link_item_link}>
                                    <div className="global-nav-search">
                                        <svg className="search-icon light" xmlns="http://www.w3.org/2000/svg" viewBox="10 10 22 22">
                                            <path class="a" d="M0 0h48v48H0z" style={{fill:'none'}}/>
                                            <path class="a" d="M12 12h24v24H12z" style={{fill:'none'}}/>
                                            <g class="b" transform="translate(13 13)" style={{fill:'none',stroke:'#fff'}}>
                                                <circle cx="8" cy="8" r="8"/>
                                                <circle class="a" cx="8" cy="8" r="7" style={{fill:'none'}}/>
                                            </g>
                                            <path class="b" d="M26 26l8 8" style={{fill:'none',stroke:'#fff'}}/>
                                        </svg>
                                    </div>
                                </div>
                            </li>
                            <li className={`${styles.desktop_nav_link_item} ${styles.janrain_btn}`}>
                                <div
                                    id="ump-user-account-links"
                                    className="ump-user-account-links mobile-signin-register pull-right hidden-xs"
                                    style={{top:'auto',right:'auto'}}
                                >
                                    <button
                                        id="captureSignInLink"
                                        className="captureSignInLink capture_modal_open"
                                        style={{ display: 'block' }}
                                    >
                                        <div className={styles.janrain_profile_icon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{fill:'none'}}> <defs> <clipPath id="x"> <circle class="x" cx="12" cy="12" r="12" transform="translate(-1854 840)" style={{fill:'none'}}/> </clipPath> </defs> <g transform="translate(1866 -828)" clip-path="url(#a)"> <g class="y" stroke-width="1.5px" transform="translate(-1854 855)" style={{fill:'none',stroke:'#fff'}}> <circle class="z" cx="12" cy="12" r="12" style={{stroke:'none'}}/> <circle class="x" cx="12" cy="12" r="11.25" style={{fill:'none'}}/> </g> <g class="y" stroke-width="1.5px" transform="translate(-1847 844)" style={{fill:'none',stroke:'#fff'}}> <circle class="z" cx="5" cy="5" r="5" style={{stroke:'none'}}/> <circle class="x" cx="5" cy="5" r="4.25" style={{fill:'none'}}/> </g> <g class="y" stroke-width="1.5px"transform="translate(-1854 840)" style={{fill:'none',stroke:'#fff'}}> <circle class="z" cx="12" cy="12" r="12" style={{stroke:'none'}}/> <circle class="x" cx="12" cy="12" r="11.25" style={{fill:'none'}}/> </g> </g> <path class="x" d="M0 0h48v48H0z"/> </svg>
                                        </div>
                                    </button>

                                    <div className="captureSubWrapper">
                                        <ul className="nav navbar-nav">
                                            <li className="dropdown">
                                                <button
                                                    id="captureSignInLink"
                                                    className="capture_modal_open dropdown-accordion"
                                                    style={{ display: 'none' }}
                                                >
                                                    Sign In
                                                </button>
                                                <div className="captureLoggedInWrapper">
                                                    <div
                                                        id="captureProfileWrapper"
                                                        className="captureProfileWrapper"
                                                        style={{ display: 'none' }}
                                                    >
                                                        <div
                                                            className={styles.profile_avatar_wrapper}
                                                        >
                                                            {/*eslint-disable-next-line*/}
                                                            <img
                                                                src="#"
                                                                className="avatar avatar-24 photo profile-avatar"
                                                                height="24"
                                                                width="24"
                                                                alt="user avatar"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <ul className="dropdown-menu">
                                                    <li className="dropdown-no-children">
                                                        <a
                                                            href="https://int-www.sportsnet.ca/edit-profile/"
                                                            className="ump-submenu-item text-lightblue"
                                                            id="captureProfileLink"
                                                        >
                                                            Account
                                                        </a>
                                                    </li>
                                                    <li className="dropdown-no-children">
                                                        {/*eslint-disable-next-line*/}
                                                        <a
                                                            href="#"
                                                            id="captureSignOutLink"
                                                            className="capture_end_session text-lightblue"
                                                        >
                                                            Sign Out
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>

                                    <p className="login-failed-note" style={{ display: 'none' }} />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default GlobalNavTop
