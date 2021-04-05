import React, { PureComponent } from 'react'
import { decodeEntities, removeDomain } from '../../utils/js/shared_helpers'
import LinkComponent from './LinkComponent'

import styles from './GlobalNav.module.scss';

class GlobalNavSubSecondary extends PureComponent {
    state = {
        open_desktop_subnav_item: null,
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

        const isVideosPage = sport == 'videos' ? 'isVideosPage' : ''

        return (
            <div
                className={`${styles.NavigationSub__cont} ${isVideosPage ? styles.isVideosPage : ''} ${isLivetracker_class} ${isBasic_class} ${subnav_avail_class}`}
            >
                <div className={styles.inner_subnav_cont}>
                    <div id="subnav_scroller" className={styles.scroller}>
                        <ul>
                            {subnav && subnav.map((subnav_item, i) => {
                                const url_formatted = subnav_item.url && removeDomain(subnav_item.url)

                                const title_formatted =
                                    subnav_item.title && subnav_item.title.replace('Home', '')

                                const isModal = false

                                const doReactPage = isReactUrl(url_formatted)

                                const proper_url = getReactWpUrl(url_formatted, doReactPage)

                                const isStillActive =	
                                    (isModal && pageTypeFromUrl === 'teams') 
                                        ? styles.active		
                                        : ''

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

                                const isOpenSubMenu = this.state.open_desktop_subnav_item === subnav_item.ID
                                const hasChildMenu = subnav_item.child_menu && subnav_item.child_menu.length !== 0
                                const hasSeperator = i === 0 && subnav.length > 1

                                return (
                                    <li
                                        className={`${styles.desktop_subnav_link_item} ${
                                            isOpenSubMenu ? styles.open_submenu : ''
                                        }`}
                                        key={subnav_item.ID}
                                    >
                                        <div
                                            className={styles.desktop_subnav_link_item_link}
                                            onClick={() =>
                                                this.desktopNavLinkNavigation(
                                                    url_formatted,
                                                    left_item.ID,
                                                    hasChildMenu
                                                )
                                            }
                                        >
                                            {subnav_item.title}
                                        </div>
                                        {hasChildMenu && (
                                            <div className={styles.desktop_subnav_link_menu_container}>
                                                <ul
                                                    id={`desktop_subnav_link_menu_${subnav_item.ID}`}
                                                    className={styles.desktop_subnav_link_menu}
                                                >
                                                    <div className={styles.desktop_subnav_link_menu_left}>
                                                        {subnav_item.child_menu.map(child_item => {
                                                            const url_formatted_child =
                                                                child_item.url &&
                                                                removeDomain(child_item.url)

                                                            let modalType = ''
                                                            if (child_item.title === 'Teams') {
                                                                modalType = 'teams'
                                                            } else if (
                                                                child_item.title === 'Tables'
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
                                                                    className={styles.desktop_subnav_link_menu_item}
                                                                    key={child_item.ID}
                                                                >
                                                                    <LinkComponent
                                                                        className={styles.desktop_subnav_link_menu_item_link}
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
                                                                        {child_item.title}
                                                                    </LinkComponent>
                                                                </li>
                                                            )
                                                        })}
                                                    </div>
                                                    <div className={styles.desktop_subnav_link_menu_right}>
                                                    
                                                    </div>
                                                </ul>
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
}

export default GlobalNavSubSecondary
