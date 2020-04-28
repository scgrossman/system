import { env_url } from './endpoints'

export const NBAsilhouette = `${env_url}/player-silhouette-hockey-cut.png`

export const imgErrNBA = ev => {
    ev.target.src = NBAsilhouette
}

export const imgErrNBASVG = ev => {
    try {
        ev.target.href.baseVal = NBAsilhouette
    } catch (e) {
        console.log(e)
    }
}

/*
 * formatQuarterName: This function returns the text label of a quarter based on it's numerical value
 *
 * @param {int} quarter - integer corresponding to a quarter
 * @return {string} quarter - text representing the period in plain english
 */
export const formatQuarterName = quarter => {
    switch (quarter) {
        case 1:
            return '1st'
        case 2:
            return '2nd'
        case 3:
            return '3rd'
        case 4:
            return '4th'
        case 5:
            return 'OT'
        default:
            return quarter - 4 + 'OT'
    }
}

export const labelQuarters = quarters => {
    let quartersCopy = quarters.slice(0)

    quartersCopy.forEach((quarter, i) => {
        if (i < 4) {
            quarter.label = i + 1
        } else if (i === 4) {
            quarter.label = 'OT'
        } else {
            quarter.label = i - 3 + 'OT'
        }
    })

    return quartersCopy
}

export const nbaPriorityStat = (blocked_shots, three_pointers_made, steals) => {
    return blocked_shots > three_pointers_made
        ? blocked_shots > steals
            ? { key: 'BLK', val: blocked_shots }
            : { key: 'STL', val: steals }
        : three_pointers_made > steals
        ? { key: '3PT', val: three_pointers_made }
        : { key: 'STL', val: steals }
}

export const nbaTeamNameIDArrayMap = new Map([
    [1, 'atlanta-hawks'],
    [2, 'boston-celtics'],
    [3, 'new-orleans-pelicans'],
    [4, 'chicago-bulls'],
    [5, 'cleveland-cavaliers'],
    [6, 'dallas-mavericks'],
    [7, 'denver-nuggets'],
    [8, 'detroit-pistons'],
    [9, 'golden-state-warriors'],
    [10, 'houston-rockets'],
    [11, 'indiana-pacers'],
    [12, 'los-angeles-clippers'],
    [13, 'los-angeles-lakers'],
    [14, 'miami-heat'],
    [15, 'milwaukee-bucks'],
    [16, 'minnesota-timberwolves'],
    [17, 'brooklyn-nets'],
    [18, 'new-york-knicks'],
    [19, 'orlando-magic'],
    [20, 'philadelphia-76ers'],
    [21, 'phoenix-suns'],
    [22, 'portland-trail-blazers'],
    [23, 'sacramento-kings'],
    [24, 'san-antonio-spurs'],
    [25, 'oklahoma-city-thunder'],
    [26, 'utah-jazz'],
    [27, 'washington-wizards'],
    [28, 'toronto-raptors'],
    [29, 'memphis-grizzlies'],
    [5312, 'charlotte-hornets'],
])
