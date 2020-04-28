import React, { Component } from 'react'

//import GlobalNavTop from './GlobalNavTop'

import styles from './GlobalNav.scss';

class GlobalNav extends Component {
    // state = {
    //     nav: {},
    //     isFetching_nav: false,
    //     modal_menu_type: null,
    //     modal_menu_list: null,
    //     modal_menu_open: false,
    // }

    // tabletBreak = 768
    // desktopBreak = 1280
    // scroll_pos = 0

    // ancillarySports = ['soccer', 'juniors', 'golf']

    // ancillarySportsLeaguesMap = {
    //     ohl: 'juniors',
    //     whl: 'juniors',
    //     qmjhl: 'juniors',
    //     bund: 'soccer',
    //     bundesliga: 'soccer',
    //     mls: 'soccer',
    //     'premier-league': 'soccer',
    //     epl: 'soccer',
    //     'serie-a': 'soccer',
    //     seri: 'soccer',
    //     'ligue-1': 'soccer',
    //     fran: 'soccer',
    //     'champions-league': 'soccer',
    //     chlg: 'soccer',
    //     'la-liga': 'soccer',
    //     liga: 'soccer',
    //     pga: 'golf',
    //     lpga: 'golf',
    //     champions: 'golf',
    //     european: 'golf',
    // }

    // acceptedMajorLeagues = {
    //     nhl: 'hockey',
    //     mlb: 'baseball',
    //     nba: 'basketball',
    //     nfl: 'football',
    //     cfl: 'football',
    //     ahl: 'hockey',
    // }

    // leagueTickers = ['nhl', 'mlb', 'nba', 'nfl', 'cfl', 'ahl']

    // sportTickers = ['soccer', 'juniors']

    // reactPageUrls = [
    //     '/golf/pga',
    //     '/golf/pga/results',
    //     '/golf/pga/schedule',
    //     '/golf/pga/rankings',
    //     '/golf/pga/events',
    //     '/golf/lpga',
    //     '/golf/lpga/results',
    //     '/golf/lpga/schedule',
    //     '/golf/lpga/rankings',
    //     '/golf/lpga/events',
    //     '/golf/champions',
    //     '/golf/champions/results',
    //     '/golf/champions/schedule',
    //     '/golf/champions/rankings',
    //     '/golf/champions/events',
    //     '/golf/european',
    //     '/golf/european/results',
    //     '/golf/european/schedule',
    //     '/golf/european/rankings',
    //     '/golf/european/events',
    //     '/hockey/nhl/scores',
    //     '/hockey/nhl/standings',
    //     '/hockey/nhl/stats',
    //     '/hockey/nhl/players',
    //     '/hockey/whc/scores',
    //     '/hockey/ahl/standings',
    //     '/hockey/ahl/scores',
    //     '/baseball/mlb/scores',
    //     '/baseball/mlb/standings',
    //     '/baseball/mlb/stats',
    //     '/baseball/mlb/players',
    //     '/basketball/nba/scores',
    //     '/basketball/nba/standings',
    //     '/basketball/nba/stats',
    //     '/basketball/nba/players',
    //     '/football/nfl/scores',
    //     '/football/nfl/standings',
    //     '/football/nfl/stats',
    //     '/football/cfl/scores',
    //     '/football/cfl/standings',
    //     '/football/cfl/stats',
    //     '/soccer/scores',
    //     '/soccer/champions-league/odds',
    //     '/juniors/scores',
    //     '/juniors/ohl',
    //     '/juniors/whl',
    //     '/juniors/qmjhl',
    //     '/juniors/world-juniors',
    //     '/schedule',
    // ]


    // componentWillUnmount() {
    //     // this.cancelNav()
    //     this.resumePageScroll()
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     const prev_sport = prevProps.match.params.sport
    //     const next_sport = this.props.match.params.sport
    //     const prev_league = prevProps.match.params.league
    //     const next_league = this.props.match.params.league

    //     // Update nav and ticker only when going in between new league pages
    //     if (
    //         (prev_league !== next_league &&
    //             (this.leagueTickers.indexOf(prev_league) !== -1 ||
    //                 this.leagueTickers.indexOf(next_league) !== -1)) ||
    //         prev_sport !== next_sport
    //     ) {
    //         this.resetSubNavScroll()
    //         this.initializeTickerEvents()
    //         this.updateTickerData()
    //         this.setGlobalLeagueOrder(this.props.match.params.sport, this.state.nav)
    //     }

    //     // FOR NAV MENU
    //     if (
    //         prevProps.navMenuCollapsed !== this.props.navMenuCollapsed &&
    //         window.innerWidth < this.tabletBreak
    //     ) {
    //         if (!this.props.navMenuCollapsed) {
    //             this.stopPageScroll()
    //         } else {
    //             this.resumePageScroll()
    //         }
    //     }

    //     // FOR TEAM MENU
    //     if (prevState.modal_menu_open !== this.state.modal_menu_open) {
    //         if (!this.state.modal_menu_open) {
    //             this.resumePageScroll()
    //         } else {
    //             this.stopPageScroll()
    //         }
    //     }
    // }

    // resetSubNavScroll = () => {
    //     const subnav_scroller = document.getElementById('subnav_scroller')

    //     if (subnav_scroller) {
    //         subnav_scroller.scrollLeft = 0
    //     }
    // }

    // stopPageScroll = () => {
    //     let doc = document.documentElement
    //     let pos = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)

    //     this.scroll_pos = pos

    //     document.body.style.position = 'fixed'
    //     document.body.style.top = '-' + pos + 'px'
    //     document.body.style.left = 0
    //     document.body.style.right = 0
    // }

    // resumePageScroll = () => {
    //     let exit_scroll_pos = this.scroll_pos

    //     document.body.style.position = 'static'
    //     document.body.style.top = 'auto'
    //     document.body.style.left = 'auto'
    //     document.body.style.right = 'auto'

    //     window.scrollTo(0, exit_scroll_pos)
    // }

    // getFromMoreMenu = (sport, nav, node = 'child_menu') => {
    //     let items = []

    //     if (nav && Object.keys(nav).length !== 0) {
    //         nav.left.forEach(l => {
    //             if (l.title === 'More') {
    //                 let subnav = l.child_menu.filter(
    //                     nav_item => nav_item.title.toLowerCase() === sport
    //                 )

    //                 items = (subnav[0] && subnav[0][node]) || []
    //             }
    //         })

    //         if (items.length !== 0) {
    //             items.sort((a, b) => (a.order > b.order ? 1 : b.order > a.order ? -1 : 0))
    //         }
    //     }

    //     return items
    // }

    // getFromMainLeftMenu = (league, nav, node = 'child_menu') => {
    //     let items = []

    //     if (nav && Object.keys(nav).length !== 0) {
    //         let subnav = {}

    //         nav.left.forEach(nav_item => {
    //             if (nav_item.title.toLowerCase() === league) subnav = nav_item

    //             if (
    //                 !nav_item.title !== league &&
    //                 nav_item.child_menu &&
    //                 nav_item.child_menu.length !== 0
    //             ) {
    //                 nav_item.child_menu.forEach(child_item => {
    //                     if (child_item.title.toLowerCase() === league) subnav = child_item
    //                 })
    //             }
    //         })

    //         items = (subnav && subnav[node]) || []
    //     }

    //     if (items.length !== 0) {
    //         items.sort((a, b) => (a.order > b.order ? 1 : b.order > a.order ? -1 : 0))
    //     }

    //     return items
    // }

    // chooseSubNavItems = (nav, sport, league) => {
    //     let chosen_items = []

    //     // check if this is a sport or league page
    //     if (this.ancillarySports.indexOf(sport) !== -1) {
    //         const fixed_sport = sport === 'juniors' ? 'jr. hockey' : sport

    //         chosen_items = this.getFromMainLeftMenu(fixed_sport, nav)

    //         if (chosen_items.length === 0) {
    //             chosen_items = this.getFromMoreMenu(fixed_sport, nav)
    //         }
    //     } else if (this.acceptedMajorLeagues.hasOwnProperty(league)) {
    //         chosen_items = this.getFromMainLeftMenu(league, nav)
    //     }

    //     return chosen_items
    // }

    // callJsScripts = () => {
    //     const { nav } = this.state

    //     loadScriptAsync(`${sn_url}/wp-content/plugins/rdm-solr/dist/js/rdm-solr-form.js`)
    //     loadScriptAsync(`${sn_url}/wp-content/themes/sportsnet-nhl/js/lib/snet.header.init.js`)

    //     this.setGlobalLeagueOrder(this.props.match.params.sport, nav)

    //     this.initializeTickerEvents()
    // }

    // setGlobalLeagueOrder = (sport, nav_data) => {
    //     const fixed_sport = sport === 'juniors' ? 'jr. hockey' : sport
    //     const action_type = sport === 'juniors' ? 'JUNIORS_LEAGUE_ORDER' : 'SOCCER_LEAGUE_ORDER'

    //     let leagues_subnav = this.getFromMainLeftMenu(fixed_sport, nav_data, 'leagues_data') || []

    //     if (leagues_subnav.length === 0) {
    //         leagues_subnav = this.getFromMoreMenu(fixed_sport, nav_data, 'leagues_data') || []
    //     }

    //     // store.dispatch({
    //     //     type: action_type,
    //     //     ordered_leagues: leagues_subnav,
    //     // })
    // }

    // tickerClickEvent(event) {
    //     event.preventDefault()
    //     const history = event.data.history

    //     // eslint-disable-next-line
    //     let targetUrl = $(this).attr('href')
    //     history.push(targetUrl.replace(/^.*\/\/[^/]+/, ''))
    // }

    // removeTickerEvents = () => {
    //     try {
    //         const history = this.props.history
    //         const tickerClickEvent = this.tickerClickEvent
    //         // eslint-disable-next-line
    //         $('body a.gamelink').off('click', { history: history }, tickerClickEvent)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    // addTickerEvents = () => {
    //     try {
    //         const history = this.props.history
    //         const tickerClickEvent = this.tickerClickEvent
    //         // eslint-disable-next-line
    //         $('body a.gamelink').on('click', { history: history }, tickerClickEvent)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    // initializeTickerEvents = () => {
    //     // ignore if sport is football or soccer
    //     if (
    //         this.props.match.params.sport === 'football' ||
    //         this.props.match.params.sport === 'soccer' ||
    //         this.props.match.params.sport === 'juniors'
    //     )
    //         return null

    //     this.removeTickerEvents() // remove any lingering events first
    //     // initialize ticker pill click events
    //     setTimeout(() => {
    //         this.addTickerEvents()
    //     }, 500)
    // }

    // updateTickerData = () => {
    //     const league_ticker_is_good =
    //         this.leagueTickers.indexOf(this.props.match.params.league) !== -1

    //     const sport_ticker_is_good = this.sportTickers.indexOf(this.props.match.params.sport) !== -1

    //     let new_ticker_type = league_ticker_is_good
    //         ? 'league'
    //         : sport_ticker_is_good
    //         ? 'sport'
    //         : 'global'

    //     try {
    //         // eslint-disable-next-line
    //         snetScoresData.togglePolling() // stop polling ticker endpoint

    //         let scoresdata_query_params = {}

    //         if (league_ticker_is_good) {
    //             scoresdata_query_params = { league: this.props.match.params.league }
    //         } else if (sport_ticker_is_good) {
    //             scoresdata_query_params = { sport: this.props.match.params.sport }
    //         }

    //         // eslint-disable-next-line
    //         snetScoresData.updateUrl(scoresdata_query_params) // update ticker endpoint
    //         // eslint-disable-next-line
    //         snetScoresData.togglePolling() // allow polling again
    //         // eslint-disable-next-line
    //         snetScoresData.initiate() // grab that new data

    //         // eslint-disable-next-line
    //         tickerv2.setInitTickerType(new_ticker_type)

    //         if (league_ticker_is_good) {
    //             // eslint-disable-next-line
    //             tickerv2.setInitTickerLeague(this.props.match.params.league)
    //         } else if (sport_ticker_is_good) {
    //             // eslint-disable-next-line
    //             tickerv2.setInitTickerSport(this.props.match.params.sport)
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    // navMenuToggle = () => {
    //     // Override menu logic for video pages on mobile: use subnav there instead.
    //     if (window.location.pathname.includes('/videos') && window.SN.isMobile) {
    //         document
    //             .getElementById('menu-video-navigation')
    //             .parentElement.classList.toggle('collapse')
    //         return
    //     }

    //     // store.dispatch({
    //     //     type: 'NAV_MENU_COLLAPSED',
    //     //     collapsed: !this.props.navMenuCollapsed,
    //     // })
    // }

    // getModalList = (nav_name, node = '') => {
    //     if (!nav_name) return null

    //     if (nav_name === 'juniors') {
    //         nav_name = 'jr. hockey'
    //     }

    //     let chosen_list_items = []
    //     const nav = this.state.nav

    //     if (nav && Object.keys(nav).length !== 0) {
    //         nav.left.forEach(nav_item => {
    //             if (nav_item.title.toLowerCase() === nav_name) {
    //                 chosen_list_items = nav_item[node] || []
    //             }
    //             if (nav_item.title.toLowerCase() === 'more') {
    //                 nav_item.child_menu &&
    //                     nav_item.child_menu.forEach(nav_child_item => {
    //                         if (nav_child_item.title.toLowerCase() === nav_name.toLowerCase()) {
    //                             chosen_list_items = nav_child_item[node] || []
    //                         }
    //                     })
    //             }
    //         })
    //     }

    //     return chosen_list_items
    // }

    // modalMenuToggle = (type, type_arg = '') => {
    //     if (!type) return null

    //     let modal_menu_list = []
    //     let modal_menu_open = !this.state.modal_menu_open
    //     let modal_menu_type = null

    //     if (type === 'teams') {
    //         let league_official =
    //             type_arg && typeof type_arg === 'string'
    //                 ? type_arg.toLowerCase()
    //                 : this.props.match.params.league
    //         if (!this.acceptedMajorLeagues.hasOwnProperty(league_official)) return null

    //         modal_menu_list = this.getModalList(league_official, 'teams_data')
    //         modal_menu_type = 'teams'
    //     } else if (type === 'leagues' && (type_arg === 'soccer' || type_arg === 'juniors')) {
    //         modal_menu_list = this.getModalList(type_arg, 'leagues_data')
    //         modal_menu_type = 'leagues'
    //     }

    //     this.setState({
    //         modal_menu_list: modal_menu_list,
    //         modal_menu_open: modal_menu_open,
    //         modal_menu_type: modal_menu_type,
    //     })
    // }

    // modalMenuClose = () => {
    //     this.setState({
    //         modal_menu_open: false,
    //     })
    // }

    // isReactUrl = url => {
    //     if (!url) return url
    //     const url_no_trailing_slash = removeTrailingSlash(url)
    //     return this.reactPageUrls.indexOf(url_no_trailing_slash) !== -1
    // }

    // getReactWpUrl = (url, isReactPage) => {
    //     return isReactPage ? url : `${sn_url}${url}`
    // }

    render() {
        // const {
        //     isFetching_nav,
        //     nav,
        //     modal_menu_list,
        //     modal_menu_open,
        //     modal_menu_type,
        // } = this.state
        // const { sport, league } = this.props.match.params
        // const { navMenuCollapsed, history } = this.props

        // const subnav = this.chooseSubNavItems(nav, sport, league)
        // const pageTypeFromUrl = window.location.pathname.split('/')[3] || ''

        // const isLivetracker_class = pageTypeFromUrl === 'games' ? 'isLivetracker' : ''
        // const isBasic_class =
        //     isLivetracker_class && getParameterByName('template') === 'basic' ? 'isBasic' : ''

        // const menu_collapsed_class = navMenuCollapsed ? 'collapsed_nav' : 'open_nav'
        // const modal_menu_open_class = modal_menu_open ? 'active' : ''

        return (
            <React.Fragment>
                <div
                    className={styles.activeTest}
                    //onClick={this.navMenuToggle}
                />

                {/* <div
                    className={`Navigation_team_menu_bg__cont ${modal_menu_open_class}`}
                    onClick={this.modalMenuClose}
                />

                <GlobalNavTop
                    isFetching_nav={isFetching_nav}
                    isLivetracker_class={isLivetracker_class}
                    isBasic_class={isBasic_class}
                    menu_collapsed_class={menu_collapsed_class}
                    nav={nav}
                    history={history}
                    isReactUrl={this.isReactUrl}
                    getReactWpUrl={this.getReactWpUrl}
                    navMenuToggle={this.navMenuToggle}
                    modalMenuClose={this.modalMenuClose}
                    modalMenuToggle={this.modalMenuToggle}
                    tabletBreak={this.tabletBreak}
                    desktopBreak={this.desktopBreak}
                />

                <div className={`Navigation_ghost__cont ${isBasic_class}`} /> */}

               
            </React.Fragment>
        )
    }
}

export default GlobalNav;
