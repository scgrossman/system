export let stats_v2
export let sn_url
export let env_url
export let brightcode_player_id
export let broadcast_api_url
export let gallery_player_id
export let solr_search_url
export let solr_global_url
export let sn_stories_tax_url
export let sn_nav_url
export let wp_api_video_slug
export let wp_api_video_page
export let igh_url
export let igh_video_clips_url
export let series_coverage_url

export const player_image_url = 'https://assets1.sportsnet.ca/wp-content/uploads/players'

if (process.env.REACT_APP_ENV === 'staging') {
    stats_v2 = 'https://d2ops9awlxr3s5.cloudfront.net'
    sn_url = 'https://staging-www.sportsnet.ca'
    env_url = 'https://d2il0j1qr7e4lc.cloudfront.net'
    brightcode_player_id = 'By5x5ZRLZ'
    gallery_player_id = 'HJcCEi4Xg'
    broadcast_api_url = 'https://sportsnet-golang-live-dev.herokuapp.com'
    solr_search_url = 'https://us-east-1.websolr.com/solr/a9c57d4ef328'
    solr_global_url = 'https://us-east-1.websolr.com/solr/b96de0824357'
    sn_stories_tax_url = 'https://int-www.sportsnet.ca/wp-json/sportsnet/v1/posts-by-tax'
    sn_nav_url = 'https://int-www.sportsnet.ca/wp-json/sportsnet/v1/menu'
    wp_api_video_page = 'https://int-www.sportsnet.ca/wp-json/sportsnet/v1/video-page'
    series_coverage_url = 'https://staging-www.sportsnet.ca/wp-json/sportsnet/v1/series-covarage'
    wp_api_video_slug = 'https://int-www.sportsnet.ca/wp-json/sportsnet/v1/video-by-slug/?slug='
    igh_video_clips_url = 'https://igh.sportsnet.ca/api/items'
    igh_url = 'https://igh.sportsnet.ca'
} else if (process.env.NODE_ENV === 'development') {
    stats_v2 = 'http://mobile-stats-int-1987921817.us-east-1.elb.amazonaws.com/api/v1'
    sn_url = 'https://int-www.sportsnet.ca'
    env_url = 'https://dczu06sbgnaj.cloudfront.net'
    brightcode_player_id = 'By5x5ZRLZ'
    gallery_player_id = 'HJcCEi4Xg'
    broadcast_api_url = 'https://sportsnet-golang-live-dev.herokuapp.com'
    solr_search_url = 'https://us-east-1.websolr.com/solr/a9c57d4ef328'
    solr_global_url = 'https://us-east-1.websolr.com/solr/b96de0824357'
    sn_stories_tax_url = 'https://int-www.sportsnet.ca/wp-json/sportsnet/v1/posts-by-tax'
    series_coverage_url = 'http://int-www.sportsnet.ca/wp-json/sportsnet/v1/series-covarage'
    sn_nav_url = 'https://int-www.sportsnet.ca/wp-json/sportsnet/v1/menu'
    wp_api_video_page = 'https://int-www.sportsnet.ca/wp-json/sportsnet/v1/video-page'
    wp_api_video_slug = 'https://int-www.sportsnet.ca/wp-json/sportsnet/v1/video-by-slug/?slug='
    igh_video_clips_url = 'https://staging-igh.herokuapp.com/api/items'
    igh_url = 'https://staging-igh.herokuapp.com'
} else {
    stats_v2 = 'https://d290qmen6zswb.cloudfront.net'
    sn_url = 'https://www.sportsnet.ca'
    env_url = 'https://d2d3jzrdszam8s.cloudfront.net'
    brightcode_player_id = 'SyVBbGuqZ'
    gallery_player_id = 'rkedLxwfab'
    broadcast_api_url = 'https://sportsnet-golang-live-prod.herokuapp.com'
    solr_search_url = 'https://us-east-1.websolr.com/solr/42bf173ecda8'
    solr_global_url = 'https://us-east-1.websolr.com/solr/b7c4528d3f19'
    sn_stories_tax_url = 'https://www.sportsnet.ca/wp-json/sportsnet/v1/posts-by-tax'
    series_coverage_url = 'https://www.sportsnet.ca/wp-json/sportsnet/v1/series-covarage'
    sn_nav_url = 'https://www.sportsnet.ca/wp-json/sportsnet/v1/menu'
    wp_api_video_page = 'https://www.sportsnet.ca/wp-json/sportsnet/v1/video-page'
    wp_api_video_slug = 'https://www.sportsnet.ca/wp-json/sportsnet/v1/video-by-slug/?slug='
    igh_video_clips_url = 'https://igh.sportsnet.ca/api/items'
    igh_url = 'https://igh.sportsnet.ca'
}

export const getWsUrl = league => {
    let ws_url = ''

    switch (league) {
        case 'mlb':
            if (process.env.REACT_APP_ENV === 'staging') {
                ws_url = 'wss://stgspnmlb-ws.sportsnet.ca/livetracker'
            } else if (process.env.NODE_ENV === 'development') {
                ws_url = 'wss://stgspnmlb-ws.sportsnet.ca/livetracker'
            } else {
                ws_url = 'wss://prdspnmlb-ws.sportsnet.ca/livetracker'
            }
            break
        case 'nhl':
            if (process.env.REACT_APP_ENV === 'staging') {
                ws_url = 'wss://stgspnmlb-ws.sportsnet.ca/livetracker'
            } else if (process.env.NODE_ENV === 'development') {
                ws_url = 'wss://stgspnmlb-ws.sportsnet.ca/livetracker'
            } else {
                ws_url = 'wss://prdspnmlb-ws.sportsnet.ca/livetracker'
            }
            break
        default:
            ws_url = 'wss://stgspnmlb-ws.sportsnet.ca/livetracker'
    }

    return ws_url
}
