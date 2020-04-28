import update from 'immutability-helper'
import { env_url } from './endpoints'

export const MLBsilhouette = `${env_url}/player-silhouette-baseball-cut.png`

export const formatPitcherMatchupStats = stats => {
    const variableStats = {}
    let permKeys = []

    const vStatsKeys = !stats.is_season_stat ? ['walks', 'strike_outs'] : []
    const pStatsKeys = !stats.is_season_stat
        ? ['innings_pitched', 'hits', 'earned_runs']
        : ['earned_run_average', 'record']

    vStatsKeys.map(stat => {
        return stats[stat] !== 0 ? (variableStats[stat] = stats[stat]) : null
    })

    pStatsKeys.map(stat => {
        if (stat === 'earned_run_average') {
            return stats[stat] !== '-' ? permKeys.push(stat) : null
        }
        return stats[stat] !== 0 ? permKeys.push(stat) : null
    })

    const keysSorted = Object.keys(variableStats).sort(function(a, b) {
        return variableStats[b] - variableStats[a]
    })
    const mergedOrder = permKeys.concat(keysSorted)

    const formatOrder = mergedOrder
        .map(statkey => {
            switch (statkey) {
                case 'hits':
                    return ` ${stats.hits} H`
                case 'innings_pitched':
                    return `${stats.innings_pitched} IP`
                case 'earned_runs':
                    return ` ${stats.earned_runs} ER`
                case 'walks':
                    return ` ${stats.walks} BB`
                case 'strike_outs':
                    return ` ${stats.strike_outs} K`
                case 'record':
                    return ` ${stats.wins}-${stats.losses}`
                case 'earned_run_average':
                    return ` ${stats.earned_run_average}`
                default:
                    return ''
            }
        })
        .slice(0, 4)

    return `${formatOrder}`
}

export const reformatBoxscoresTableStatMLB = values => {
    if (!values) return ''

    let newValues = []

    //get all names from values array
    let names = values.map((value, i) => {
        return value
            .split(' ')
            .slice(0, 2)
            .join(' ')
    })

    //get number of times a name exists in array
    var nameOccurances = names.reduce((acc, curr) => {
        acc[curr] ? acc[curr]++ : (acc[curr] = 1)
        return acc
    }, {})

    //reduce the cumulative total for each player in order
    for (let x = 0; x < Object.keys(nameOccurances).length; x++) {
        let counter = 0
        for (let i = 0; i < values.length; i++) {
            if (Object.keys(nameOccurances)[x] === names[i]) {
                let current_value = parseInt(
                    values[i].substring(values[i].lastIndexOf('(') + 1, values[i].indexOf(',')),
                    10
                )
                newValues.push(
                    values[i].replace(
                        current_value,
                        current_value -
                            (nameOccurances[Object.keys(nameOccurances)[x]] - counter - 1)
                    )
                )
                counter++
            }
        }
    }

    return newValues
}

export const formatBatterMatchupStats = stats => {
    const variableStats = {}
    let permKeys = []

    const vStatsKeys = !stats.is_season_stat
        ? [
              'doubles',
              'runs_batted_in',
              'hit_by_pitch',
              'sacrifice_flies',
              'stolen_bases',
              'strike_outs',
              'walks',
          ]
        : []
    const pStatsKeys = !stats.is_season_stat
        ? ['at_bats', 'home_runs', 'triples']
        : ['batting_average', 'home_runs', 'runs_batted_in']

    vStatsKeys.map(stat => {
        return stats[stat] !== 0 ? (variableStats[stat] = stats[stat]) : '0'
    })
    pStatsKeys.map(stat => {
        return stats[stat] !== 0 || stat === 'at_bats' ? permKeys.push(stat) : '0'
    })

    const keysSorted = Object.keys(variableStats).sort(function(a, b) {
        return variableStats[b] - variableStats[a]
    })
    const mergedOrder = permKeys.concat(keysSorted)

    const formatOrder = mergedOrder
        .map(statkey => {
            switch (statkey) {
                case 'doubles':
                    return stats.doubles !== 1 ? ` ${stats.doubles} 2B` : ` 2B`
                case 'triples':
                    return stats.triples !== 1 ? ` ${stats.triples} 3B` : ` 3B`
                case 'runs_batted_in':
                    return ` ${stats.runs_batted_in} RBI`
                case 'walks':
                    return ` ${stats.walks} BB`
                case 'strike_outs':
                    return ` ${stats.strike_outs} K`
                case 'home_runs':
                    return stats.home_runs !== 1 ? ` ${stats.home_runs} HR` : ` HR`
                case 'stolen_bases':
                    return stats.stolen_bases !== 1 ? ` ${stats.stolen_bases} SB` : ` SB`
                case 'at_bats':
                    return stats.at_bats !== 0 ? ` ${stats.hits}-${stats.at_bats}` : '0-0'
                case 'batting_average':
                    return stats.batting_average !== '-' ? ` ${stats.batting_average}` : '.000'
                case 'hit_by_pitch':
                    return stats.hit_by_pitch !== 1 ? ` ${stats.hit_by_pitch} HBP` : ' HBP'
                case 'sacrifice_flies':
                    return stats.sacrifice_flies !== 1 ? ` ${stats.sacrifice_flies} SAC` : ' SAC'
                default:
                    return ''
            }
        })
        .slice(0, 4)

    return `${formatOrder}`
}

export const imgErrMLB = ev => {
    ev.target.src = MLBsilhouette
}

export const inning_pbp_format = data => {
    const removeEv = [2, 3]
    const red_events = [
        16,
        18,
        19,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        41,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        61,
        62,
        63,
        64,
        65,
        66,
        67,
        68,
        69,
        72,
        73,
        74,
        75,
        76,
        77,
    ]
    const blue_events = [
        4,
        6,
        7,
        8,
        10,
        11,
        12,
        13,
        14,
        15,
        17,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        54,
        55,
        56,
        60,
    ]

    let new_pbp_arr = []
    const cleaned = data.filter(function(play) {
        return removeEv.indexOf(play.event_id) === -1
    })

    cleaned.map((play, i) => {
        let merge_play = {}
        // Add color to play obj //
        if (red_events.indexOf(+play.event_id) > -1) {
            merge_play.color = 'red'
            merge_play.game_event = true
        } else if (blue_events.indexOf(+play.event_id) > -1) {
            merge_play.color = 'blue'
            merge_play.game_event = true
        } else {
            merge_play.color = 'no_color'
            merge_play.game_event = false
        }

        return new_pbp_arr.push(update(merge_play, { $merge: data[i] }))
    })

    return new_pbp_arr
}

/*
 * isPlayoffGame: Check if game is a playoffs game
 * @param {string} gametype - type of a game played
 * @return {boolean} - is game a playoff game
 */
export const isPlayoffGame = gametype => {
    switch (gametype) {
        case 'Wild Card Game':
        case 'Division Playoff':
        case 'LCS':
        case 'World Series':
            return true
        default:
            return false
    }
}

/*
 * seriesGames: How many game in particular playoff series
 * @param {string} gametype - type of a game played
 * @return {int} - number of games in a series
 */
export const seriesGames = gametype => {
    switch (gametype) {
        case 'Division Playoff':
            return 5
        case 'LCS':
        case 'World Series':
            return 7
        default:
            return 1
    }
}

export const mlbTeamNameIDArrayMap = new Map([
    [253, 'arizona-diamondbacks'],
    [239, 'atlanta-braves'],
    [225, 'baltimore-orioles'],
    [226, 'boston-red-sox'],
    [240, 'chicago-cubs'],
    [228, 'chicago-white-sox'],
    [241, 'cincinnati-reds'],
    [229, 'cleveland-indians'],
    [251, 'colorado-rockies'],
    [230, 'detroit-tigers'],
    [242, 'houston-astros'],
    [231, 'kansas-city-royals'],
    [227, 'los-angeles-angels'],
    [243, 'los-angeles-dodgers'],
    [252, 'miami-marlins'],
    [232, 'milwaukee-brewers'],
    [233, 'minnesota-twins'],
    [245, 'new-york-mets'],
    [234, 'new-york-yankees'],
    [235, 'oakland-athletics'],
    [246, 'philadelphia-phillies'],
    [247, 'pittsburgh-pirates'],
    [249, 'san-diego-padres'],
    [250, 'san-francisco-giants'],
    [236, 'seattle-mariners'],
    [248, 'st-louis-cardinals'],
    [254, 'tampa-bay-rays'],
    [237, 'texas-rangers'],
    [238, 'toronto-blue-jays'],
    [244, 'washington-nationals'],
])
