import React, { PureComponent } from 'react'

import { removeDomain } from '../../utils/js/shared_helpers'
import LinkComponent from './LinkComponent'

import styles from './GlobalNav.module.scss';

class GlobalNavMobile extends PureComponent {
    state = {
        mobile_more_menu_open: false,
        mobile_watch_menu_open: false,
        mobile_listen_menu_open: false,
    }

    toggleMobileMoreMenu = () => {
        this.setState({
            mobile_more_menu_open: !this.state.mobile_more_menu_open,
        })
    }

    toggleMobileWatchMenu = () => {
        this.setState({
            mobile_watch_menu_open: !this.state.mobile_watch_menu_open,
        })
    }
    toggleMobileListenMenu = () => {
        window.scrollTo(0, 0)
        this.setState({
            mobile_listen_menu_open: !this.state.mobile_listen_menu_open,
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
        const { mobile_more_menu_open, mobile_watch_menu_open, mobile_listen_menu_open } = this.state

        const sn_now_logo_css = `.sn_now_logo_css{fill:#0098d8}`

        return (
            <div className={`${styles.NavigationMobile__cont} ${menu_collapsed_class}`}>
                <div className={styles.mobile_menu_search}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path class="a" fill="none" d="M0 0h24v24H0z"/><g class="b" fill="none" stroke="#0e69ae" stroke-width="1px" transform="translate(3 3)"><circle cx="7" cy="7" r="7"/><circle class="a" cx="7" cy="7" r="6"/></g><path class="b" fill="none" stroke="#0e69ae" stroke-width="2px" d="M13.823 13.823l6.519 6.519"/></svg>
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
                                                isNavLink
                                                onClick={() => {
                                                    if (doReactPage) {
                                                        navMenuToggle()
                                                        modalMenuClose()
                                                    }
                                                }}
                                            >
                                                <img className={styles.mobile_nav_primary_logo} src={left_item.logo} />
                                                <div className={styles.mobile_nav_primary_title}>{left_item.title}</div>
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
                                        left_item.child_menu.length !== 0 && (
                                            <div className={`${styles.mobile_nav_secondary_list} ${
                                                mobile_more_menu_open ? styles.slideIn : styles.slideOut
                                            }`}>
                                                <div className={`${styles.mobile_nav_secondary_back} ${styles.Navigation_chevron}`} onClick={this.toggleMobileMoreMenu}>Back</div>
                                                {left_item.child_menu.map(more_child_item => {
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
                                                                window.scrollTo(0, 0)
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

                <ul className={styles.mobile_nav_link_list}>
                {Object.keys(nav).length !== 0 &&
                        nav.right.map(right_item => {
                            const url_formatted = right_item.url && removeDomain(right_item.url)
                            const isWatch = right_item.title === 'Watch'
                            const isListen = right_item.title === 'Listen'
                            const doReactPage = isReactUrl(url_formatted)
                            const proper_url = getReactWpUrl(url_formatted, doReactPage)

                            return (
                                <React.Fragment key={right_item.ID}>
                                    <li className={`${styles.mobile_nav_link_list_item} ${styles.mobile_nav_link_list_item_right}`}>
                                        {!isWatch && !isListen && (
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
                                                {right_item.title}
                                            </LinkComponent>
                                        )}
                                        {isWatch && (
                                            <div onClick={this.toggleMobileWatchMenu}>
                                                {right_item.title}
                                                <span
                                                    className={`${styles.Navigation_chevron} ${
                                                        mobile_watch_menu_open ? styles.active : ''
                                                    }`}
                                                />
                                            </div>
                                        )}
                                        {isListen && (
                                            <div onClick={this.toggleMobileListenMenu}>
                                                {right_item.title}
                                                <span
                                                    className={`${styles.Navigation_chevron} ${
                                                        mobile_listen_menu_open ? styles.active : ''
                                                    }`}
                                                />
                                            </div>
                                        )}
                                    </li>
                                    {mobile_watch_menu_open &&
                                        isWatch &&
                                        right_item.child_menu.length !== 0 && (
                                            <div className={`${styles.mobile_nav_secondary_list} ${
                                                mobile_watch_menu_open ? styles.slideIn : styles.slideOut
                                            }`}>
                                                <div className={`${styles.mobile_nav_secondary_back} ${styles.Navigation_chevron}`} onClick={this.toggleMobileWatchMenu}>Back</div>
                                                {right_item.child_menu.map(more_child_item => {
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
                                                                window.scrollTo(0, 0)
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
                                        isListen &&
                                        right_item.child_menu.length !== 0 && (
                                            <div className={`${styles.mobile_nav_secondary_list} ${
                                                mobile_listen_menu_open ? styles.slideIn : styles.slideOut
                                            }`}>
                                                <div className={`${styles.mobile_nav_secondary_back} ${styles.Navigation_chevron}`} onClick={this.toggleMobileListenMenu}>Back</div>
                                                {right_item.child_menu.map(more_child_item => {
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
                                                            console.log('THIS IS LISTEN YO')
                                                            if (doReactPage) {
                                                                console.log('THIS IS LISTEN YO')
                                                                navMenuToggle()
                                                                modalMenuClose()
                                                                window.scrollTo(0, 0)
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

                <a href="https://www.sportsnet.ca/now">
                    <div className={`${styles.sn_now_cta_mobile}`}>
                        <div className={`${styles.cta_message_first}`}>
                            Stream
                        </div>
                        <div className={`${styles.cta_message_sn_now_logo}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 77 24"><defs><style>{sn_now_logo_css}</style></defs>
                            <path fill="none" d="M0 0h77v24H0z"/>
                            <path d="M16.198 19.854c2.249-2.286 7.655-.218 8.2-.29.29-.036.4-.435-.145-.653A37.664 37.664 0 006.62 17.024c-.472.145-.653.544.109.653a46.167 46.167 0 015.478.907 15.207 15.207 0 013.63 1.379c.109.073.218.036.363-.109" fill="#005cb9"/>
                            <path d="M24.869 17.822l.472-2.177a38.372 38.372 0 00-25 .617c-.435.145-.58.762.327.617a96.358 96.358 0 0111.283-.907 40.114 40.114 0 0112.193 2.027c.435.145.653.073.726-.181" fill="#e1251b"/>
                            <path d="M24.215 4.399l-1.378 6.458h-.036l-1.887-6.458H14.02l-.616 2.864h1.016l-1.234 5.88h.581c.98 0 1.959.036 2.9.109l1.306-6.1h.036l1.887 6.458a41.757 41.757 0 015.624 1.306h.036l2.215-10.553h-3.556zM12.896 7.265c.36-1.995-.617-3.12-4.717-3.12-3.846 0-5.95.943-6.423 3.048a1.841 1.841 0 00.327 1.669c1.052 1.125 5.551 1.6 5.95 2.177a.563.563 0 01.073.435c-.181.762-1.125.98-1.959.98a1.32 1.32 0 01-1.088-.4 1.48 1.48 0 01-.109-1.161H.85c-.29 1.669-.363 3.12 3.81 3.3a36.516 36.516 0 016.132-.98 3.218 3.218 0 001.6-2.1 1.91 1.91 0 00-.363-1.778c-1.056-1.163-5.373-1.562-5.882-2.179a.463.463 0 01-.073-.435c.109-.508.617-.8 1.488-.8a1.841 1.841 0 011.125.254.97.97 0 01.254 1.052h3.955z"/>
                            <path class="sn_now_logo_css" d="M39.925 4.29l-1.56 7.184-3.012-7.184h-4.317l-2.322 10.921h3.12l1.524-7.184 2.975 7.184h4.354L43.009 4.29zM50.011 4c-4.063 0-6.857 2.068-7.619 5.7a4.861 4.861 0 00.653 4.136c.907 1.088 2.431 1.669 4.608 1.669 4.063 0 6.857-2.068 7.619-5.7a4.861 4.861 0 00-.653-4.136C53.748 4.544 52.191 4 50.011 4zm-4.1 5.769c.327-1.488 1.2-3.229 3.628-3.229a2.348 2.348 0 011.923.689 2.946 2.946 0 01.29 2.467c-.327 1.488-1.2 3.229-3.628 3.229a2.348 2.348 0 01-1.923-.689 2.921 2.921 0 01-.289-2.467zM71.055 4.29l-3.41 7.764-.291-7.764h-3.991l-3.882 7.8.036-7.8h-3.628l.8 10.921h4.064l3.773-7.8.363 7.8h3.991L74.389 4.29zM74.792 4.29h.762v.109h-.327v.834h-.109v-.834h-.326zM76.46 5.233v-.834l-.254.8h-.145l-.254-.762v.8h-.109V4.29h.181l.29.8.254-.8h.181v.943z"/>
                            <path class="sn_now_logo_css" d="M74.792 4.29h.762v.109h-.327v.834h-.109v-.834h-.326zM76.46 5.233v-.834l-.254.8h-.145l-.254-.762v.8h-.109V4.29h.181l.29.8.254-.8h.181v.943z"/>
                            </svg>
                        </div>
                        <div className={`${styles.cta_message_second}`}>
                            on the SN App
                        </div>
                        <div className={`${styles.cta_message_open_new}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 0h20v20H0z" fill="none"/><path d="M15.444 15.444H4.556V4.556H10V3H4.556A1.555 1.555 0 003 4.556v10.888A1.555 1.555 0 004.556 17h10.888A1.56 1.56 0 0017 15.444V10h-1.556zM11.556 3v1.556h2.792L6.7 12.2l1.1 1.1 7.646-7.646v2.79H17V3z" fill="#b9b9b9"/></svg>
                        </div>
                    </div>
                </a>

                {/* <ul className={styles.mobile_nav_link_list}>
                    <li id="ump-user-account-links" className={styles.mobile_nav_link_list_item}>
                        <button
                            id="captureSignInLink"
                            className="captureSignInLink capture_modal_open"
                            style={{ display: 'block' }}
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

                <p className="login-failed-note" style={{ display: 'none' }} /> */}
            </div>
        )
    }
}

export default GlobalNavMobile
