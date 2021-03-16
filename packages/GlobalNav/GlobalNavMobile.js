import React, { PureComponent } from 'react'

import { removeDomain } from '../../utils/js/shared_helpers'
import LinkComponent from './LinkComponent'

import styles from './GlobalNav.module.scss';

class GlobalNavMobile extends PureComponent {
    state = {
        mobile_more_menu_open: false,
    }

    toggleMobileMoreMenu = () => {
        this.setState({
            mobile_more_menu_open: !this.state.mobile_more_menu_open,
        })
    }

    render() {
        const {
            menu_collapsed_class,
            nav,
            isReactUrl,
            navMenuToggle,
            modalMenuClose,
            getReactWpUrl,
            withNavProps
        } = this.props
        const { mobile_more_menu_open } = this.state

        return (
            <div className={`${styles.NavigationMobile__cont} ${menu_collapsed_class}`}>
                <div className={styles.mobile_menu_search}>
                    <img
                        src="https://www.sportsnet.ca/wp-content/themes/sportsnet-nhl/images/spyglass.png"
                        alt="Search Glass"
                    />
                    <button id="search-input-mobile">Search</button>
                </div>

                <ul className={styles.mobile_nav_link_list}>
                    {Object.keys(nav).length !== 0 &&
                        nav.left.map(left_item => {
                            const url_formatted = left_item.url && removeDomain(left_item.url)
                            const isMore = left_item.title === 'More'
                            const doReactPage = isReactUrl(url_formatted)
                            const proper_url = getReactWpUrl(url_formatted, doReactPage)

                            return (
                                <React.Fragment key={left_item.ID}>
                                    <li className={styles.mobile_nav_link_list_item}>
                                        {!isMore && (
                                            <LinkComponent
                                                url={proper_url}
                                                withNavProps={withNavProps}
                                                singlePageNavigation={doReactPage}
                                                withNavProps={withNavProps}
                                                isNavLink
                                                onClick={() => {
                                                    if (doReactPage) {
                                                        navMenuToggle()
                                                        modalMenuClose()
                                                    }
                                                }}
                                            >
                                                {left_item.title}
                                            </LinkComponent>
                                        )}
                                        {isMore && (
                                            <div onClick={this.toggleMobileMoreMenu}>
                                                {left_item.title}
                                                <span
                                                    className={`${styles.Navigation_chevron} ${
                                                        mobile_more_menu_open ? styles.active : ''
                                                    }`}
                                                />
                                            </div>
                                        )}
                                    </li>
                                    {mobile_more_menu_open &&
                                        isMore &&
                                        left_item.child_menu.length !== 0 &&
                                        left_item.child_menu.map(more_child_item => {
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
                                </React.Fragment>
                            )
                        })}
                </ul>

                <ul className={styles.mobile_nav_link_list}>
                    {Object.keys(nav).length !== 0 &&
                        nav.right.map(right_item => {
                            if (right_item.title !== 'Miscl') return ''

                            return (
                                <React.Fragment key={right_item.ID + 'mobile'}>
                                    {right_item.child_menu.map(right_child_item => {
                                        const url_formatted =
                                            right_child_item.url &&
                                            removeDomain(right_child_item.url)
                                        const doReactPage = isReactUrl(url_formatted)
                                        const proper_url = getReactWpUrl(url_formatted, doReactPage)

                                        return (
                                            <li
                                                className={styles.mobile_nav_link_list_item}
                                                key={right_child_item.ID + 'mobile'}
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
                                                    {right_child_item.title}
                                                </LinkComponent>
                                            </li>
                                        )
                                    })}
                                </React.Fragment>
                            )
                        })}
                </ul>

                <ul className={styles.mobile_nav_link_list}>
                    <li id="ump-user-account-links" className={styles.mobile_nav_link_list_item}>
                        <button
                            id="captureSignInLink"
                            className="captureSignInLink capture_modal_open"
                            style={{ display: 'none' }}
                        >
                            Sign In
                        </button>
                    </li>
                </ul>

                <div className="captureSubWrapper">
                    <ul className={styles.mobile_nav_link_list}>
                        <li className={styles.mobile_nav_link_list_item}>
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
                        </li>
                        <li className={styles.mobile_nav_link_list_item}>
                            <a
                                href="https://int-www.sportsnet.ca/edit-profile/"
                                className="ump-submenu-item text-lightblue"
                                id="captureProfileLink"
                            >
                                Account
                            </a>
                        </li>
                        <li className={styles.mobile_nav_link_list_item}>
                            <button
                                id="captureSignOutLink"
                                className="capture_end_session text-lightblue"
                            >
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </div>

                <p className="login-failed-note" style={{ display: 'none' }} />
            </div>
        )
    }
}

export default GlobalNavMobile
