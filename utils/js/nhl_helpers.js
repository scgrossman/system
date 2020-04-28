import { env_url } from './endpoints'

export const NHLsilhouette = `${env_url}/player-silhouette-hockey-cut.png`

export const imgErrNHL = ev => {
    ev.target.src = NHLsilhouette
}

/*
 * formatPeriodName: This function returns the text label of a period based on it's numerical value
 *
 * Input: period - integer corresponding to a period
 * Input: game_type - string describing type of game. e.g. Preseason
 *
 * Output: period - string of text representing the period in plain english
 */
export const formatPeriodName = (period, game_type) => {
    if (period === 1) {
        return '1st'
    } else if (period === 2) {
        return '2nd'
    } else if (period === 3) {
        return '3rd'
    } else if (period === 4) {
        return 'OT'
    } else {
        if (game_type === 'Regular Season' || game_type === 'Preseason') {
            return 'SO'
        } else {
            // Post season game
            return period - 3 + 'OT'
        }
    }
}

/*
 * labelPeriods: This function adds text labels to the periods array
 *
 * Input: periods - array of period objects
 * Input: game_type - string describing type of game. e.g. Preseason
 *
 * Output: periods - array: the same array originally input, but with an added "label" paramter in each period object.
 */
export const labelPeriods = (periods, game_type, ighClips = []) => {
    let periodCopy = JSON.parse(JSON.stringify(periods))

    if (game_type === 'Regular Season' || game_type === 'Preseason') {
        periodCopy.forEach(function(period, i) {
            if (i < 3) {
                periodCopy[i].label = i + 1
            } else if (i === 3) {
                periodCopy[i].label = 'OT'
            } else {
                periodCopy[i].label = 'SO'
            }
        })
    } else {
        //Post season game
        periodCopy.forEach(function(period, i) {
            if (i < 3) {
                periodCopy[i].label = i + 1
            } else if (i === 3) {
                periodCopy[i].label = 'OT'
            } else {
                periodCopy[i].label = i - 2 + 'OT'
            }
        })
    }

    if (ighClips && ighClips.length !== 0) {
        periodCopy.forEach((period, p) => {
            let type = period.goals ? 'goals' : period.shootouts ? 'shootouts' : ''

            if (period.hasOwnProperty(type) && period[type].length !== 0) {
                period[type].forEach((item, g) => {
                    if (!isNaN(item.player_id)) {
                        const igh_length = ighClips.length

                        for (let i = 0; i < igh_length; i++) {
                            const ighClip = ighClips[i]

                            if (
                                ighClip.title &&
                                ighClip.keywords &&
                                ighClip.players &&
                                ighClip.players[0]
                            ) {
                                const regExpForParenthesesValue = /\(([^)]+)\)/
                                const match = regExpForParenthesesValue.exec(ighClip.title)
                                const time_from_title = match[1]

                                if (time_from_title) {
                                    const colon_split = time_from_title.split(':')
                                    let igh_goal_minutes = null
                                    let igh_goal_seconds = null
                                    let is_igh_shootout = null

                                    if (
                                        type === 'goals' &&
                                        !isNaN(item.minutes) &&
                                        !isNaN(item.seconds)
                                    ) {
                                        igh_goal_minutes =
                                            colon_split[0] && parseInt(colon_split[0], 10)
                                        igh_goal_seconds =
                                            colon_split[1].split('/')[0] &&
                                            parseInt(colon_split[1].split('/')[0], 10)
                                    } else if (type === 'shootouts') {
                                        is_igh_shootout =
                                            colon_split[1].split('/')[1] &&
                                            colon_split[1].split('/')[1] === 'SO'
                                    }

                                    if (
                                        (type === 'goals' &&
                                            item.minutes === igh_goal_minutes &&
                                            item.seconds === igh_goal_seconds &&
                                            ighClip.keywords === 'goal' &&
                                            item.player_id ===
                                                parseInt(ighClip.players[0][0], 10)) ||
                                        (type === 'shootouts' &&
                                            is_igh_shootout &&
                                            ((ighClip.keywords === 'goal' && item.is_goal) ||
                                                (ighClip.keywords === 'shot' && !item.is_goal)) &&
                                            item.player_id === parseInt(ighClip.players[0][0], 10))
                                    ) {
                                        periodCopy[p][type][g]['brightcove_video'] = {
                                            id: ighClip.brightcove_id || null,
                                            title: ighClip.title || '',
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
            }
        })
    }

    return periodCopy
}

export const nhlTeamNameIDArrayMap = new Map([
    [4978, 'anaheim-ducks'],
    [4977, 'arizona-coyotes'],
    [4954, 'boston-bruins'],
    [4955, 'buffalo-sabres'],
    [4960, 'carolina-hurricanes'],
    [4956, 'calgary-flames'],
    [4957, 'chicago-blackhawks'],
    [4982, 'columbus-blue-jackets'],
    [4970, 'colorado-avalanche'],
    [4962, 'dallas-stars'],
    [4958, 'detroit-red-wings'],
    [4959, 'edmonton-oilers'],
    [4979, 'florida-panthers'],
    [4961, 'los-angeles-kings'],
    [4983, 'minnesota-wild'],
    [4963, 'montreal-canadiens'],
    [4964, 'new-jersey-devils'],
    [4980, 'nashville-predators'],
    [4965, 'new-york-islanders'],
    [4966, 'new-york-rangers'],
    [4967, 'ottawa-senators'],
    [4968, 'philadelphia-flyers'],
    [4969, 'pittsburgh-penguins'],
    [4971, 'san-jose-sharks'],
    [4972, 'st-louis-blues'],
    [4973, 'tampa-bay-lightning'],
    [4974, 'toronto-maple-leafs'],
    [4975, 'vancouver-canucks'],
    [33447, 'vegas-golden-knights'],
    [4976, 'washington-capitals'],
    [4981, 'winnipeg-jets'],
])
