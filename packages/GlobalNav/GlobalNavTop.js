import React, { PureComponent } from 'react'
import { sn_url } from '../../utils/js/endpoints'
import { decodeEntities, removeDomain } from '../../utils/js/shared_helpers'
import LinkComponent from '../../utils/components/LinkComponent'

import styles from './GlobalNav.scss';

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
        } = this.props

        return (
            <div className={styles.active}>
                <div className="top_nav_bar">
                    <button className={`burger ${menu_collapsed_class}`}>
                        <div className="burger_cont" onClick={navMenuToggle}>
                            <div className={`top ${menu_collapsed_class}`} />
                            <div className={`middle ${menu_collapsed_class}`} />
                            <div className={`bottom ${menu_collapsed_class}`} />
                        </div>
                    </button>

                    <a href="https://www.sportsnet.ca">
                        <img
                            className="sn_logo_nav_mobile"
                            src="https://www.sportsnet.ca/wp-content/themes/sportsnet-nhl/images/logo-sn.svg"
                            alt="Sportsnet Logo"
                            title="Sportsnet"
                        />
                    </a>

                    <a href="https://www.sportsnet.ca">
                        <img
                            className="sn_logo_nav_desktop"
                            src="https://www.sportsnet.ca/wp-content/themes/sportsnet-nhl/images/logo-sportsnet.svg"
                            alt="Sportsnet Logo"
                            title="Sportsnet"
                        />
                    </a>

                    <div className="livetracker_text">Live Tracker</div>

                    <div className="video_text">
                        <a href="https://www.sportsnet.ca/videos/">Video</a>
                    </div>

                    <div id="sponsor_00" className="sn-sponsor-ad" />

                    <div className="desktop_nav">
                        <ul className="desktop_nav_link_list">
                            {Object.keys(nav).length !== 0 &&
                                nav.left.map(left_item => {
                                    const url_formatted =
                                        left_item.url && removeDomain(left_item.url)
                                    const isOpenSubMenu =
                                        this.state.open_desktop_nav_item === left_item.ID
                                    const hasChildMenu =
                                        left_item.child_menu && left_item.child_menu.length !== 0
                                    const isMore = left_item.title === 'More'

                                    return (
                                        <li
                                            className={`desktop_nav_link_item ${
                                                isOpenSubMenu ? 'open_submenu' : ''
                                            }`}
                                            key={left_item.ID}
                                        >
                                            <div
                                                className="desktop_nav_link_item_link"
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
                                                <ul
                                                    id={`desktop_nav_link_menu_${left_item.ID}`}
                                                    className="desktop_nav_link_menu"
                                                >
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
                                                                className="desktop_nav_link_menu_item"
                                                                key={left_child_item.ID}
                                                            >
                                                                {!modalType && (
                                                                    <LinkComponent
                                                                        className="desktop_nav_link_menu_item_link"
                                                                        url={proper_url}
                                                                        onClick={() => {
                                                                            if (doReactPage) {
                                                                                modalMenuClose()
                                                                                this.closeDesktopNavLinkNavigation()
                                                                            }
                                                                        }}
                                                                        singlePageNavigation={
                                                                            doReactPage
                                                                        }
                                                                    >
                                                                        {left_child_item.title}
                                                                    </LinkComponent>
                                                                )}
                                                                {modalType && (
                                                                    <div
                                                                        className="desktop_nav_link_menu_item_link"
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
                                                </ul>
                                            )}
                                        </li>
                                    )
                                })}
                        </ul>

                        <ul className="desktop_nav_link_list">
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
                                            className={`desktop_nav_link_item right ${remove_at_tablet_class} ${
                                                isOpenSubMenu ? 'open_submenu' : ''
                                            }`}
                                            key={right_item.ID}
                                        >
                                            <div
                                                className="desktop_nav_link_item_link"
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
                                                <ul className="desktop_nav_link_menu">
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
                                                                className="desktop_nav_link_menu_item"
                                                                key={right_child_item.ID}
                                                            >
                                                                <LinkComponent
                                                                    className="desktop_nav_link_menu_item_link"
                                                                    url={proper_url}
                                                                    onClick={() => {
                                                                        if (doReactPage) {
                                                                            modalMenuClose()
                                                                            this.closeDesktopNavLinkNavigation()
                                                                        }
                                                                    }}
                                                                    singlePageNavigation={
                                                                        doReactPage
                                                                    }
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
                            <li className="desktop_nav_link_item">
                                <div className="desktop_nav_link_item_link">
                                    <div className="global-nav-search">
                                        <svg className="search-icon light">
                                            <use
                                                href={`${sn_url}/wp-content/themes/sportsnet-nhl/images/combined-icons.svg#search`}
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </li>
                            <li className="desktop_nav_link_item">
                                <div
                                    id="ump-user-account-links"
                                    className="ump-user-account-links mobile-signin-register pull-right hidden-xs"
                                >
                                    <button
                                        id="captureSignInLink"
                                        className="captureSignInLink capture_modal_open"
                                        style={{ display: 'none' }}
                                    >
                                        Sign In
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
                                                            className="profile-avatar-wrapper"
                                                            style={{ border: 'none' }}
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
                                                            href="https://www.sportsnet.ca/edit-profile/"
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
                            <li className="desktop_nav_link_item watch_live">
                                <a href="https://now.sportsnet.ca/">
                                    <div className="desktop_nav_link_item_link">Watch Live</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default GlobalNavTop