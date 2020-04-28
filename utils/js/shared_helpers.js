import { env_url, player_image_url } from './endpoints'
import { nhlTeamNameIDArrayMap } from './nhl_helpers'
import { mlbTeamNameIDArrayMap } from './mlb_helpers'
import { nbaTeamNameIDArrayMap } from './nba_helpers'
import { cflTeamNameIDArrayMap } from './cfl_helpers'
import { nflTeamNameIDArrayMap } from './nfl_helpers'

// **** BELOW IS ONLY USEFUL IF WE CHANGE TO SENDING DATA DIFFS THROUGH WEB SOCKETS/AJAX ****
//
// export function isObject(item) {
//   return (item && typeof item === 'object' && !Array.isArray(item));
// }
// export function mergeDeep(target, source) {
//   let output = Object.assign({}, target);
//   if (isObject(target) && isObject(source)) {
//     Object.keys(source).forEach(key => {
//       if (isObject(source[key])) {
//         if (!(key in target))
//           Object.assign(output, { [key]: source[key] });
//         else
//           output[key] = mergeDeep(target[key], source[key]);
//       } else {
//         Object.assign(output, { [key]: source[key] });
//       }
//     });
//   }
//   return output;
// }
// /**
//  * @param  {event} ev
//  * @param  {string} league
//  */
export const imgErrPerLeague = (ev, league) => {
    ev.target.src = `${env_url}/livetracker_404_${league}.png`
}

/**
 * Replaces diacritic characters in a string
 * @param {string} s
 * @returns {string} output
 */
export const accent_fold = s => {
    if (!s) {
        return ''
    }
    const accentMap = {
        À: 'A',
        Á: 'A',
        Â: 'A',
        Ä: 'A',
        Æ: 'A',
        Ã: 'A',
        Å: 'A',
        Ā: 'A',
        Ç: 'C',
        Ć: 'C',
        Č: 'C',
        È: 'E',
        É: 'E',
        Ê: 'E',
        Ë: 'E',
        Ē: 'E',
        Ė: 'E',
        Ę: 'E',
        Î: 'I',
        Ï: 'I',
        Í: 'I',
        Ī: 'I',
        Į: 'I',
        Ì: 'I',
        Ł: 'L',
        Ñ: 'N',
        Ń: 'N',
        Ô: 'O',
        Ö: 'O',
        Ò: 'O',
        Ó: 'O',
        Œ: 'O',
        Ø: 'O',
        Ō: 'O',
        Õ: 'O',
        Ś: 'S',
        Š: 'S',
        Û: 'U',
        Ü: 'U',
        Ù: 'U',
        Ú: 'U',
        Ū: 'U',
        Ÿ: 'Y',
        Ž: 'Z',
        Ź: 'Z',
        Ż: 'Z',
        à: 'a',
        á: 'a',
        â: 'a',
        ä: 'a',
        æ: 'a',
        ã: 'a',
        å: 'a',
        ā: 'a',
        ç: 'c',
        ć: 'c',
        č: 'c',
        è: 'e',
        é: 'e',
        ê: 'e',
        ë: 'e',
        ē: 'e',
        ė: 'e',
        ę: 'e',
        î: 'i',
        ï: 'i',
        í: 'i',
        ī: 'i',
        į: 'i',
        ì: 'i',
        ł: 'l',
        ñ: 'n',
        ń: 'n',
        ô: 'o',
        ö: 'o',
        ò: 'o',
        ó: 'o',
        œ: 'o',
        ø: 'o',
        ō: 'o',
        õ: 'o',
        ß: 's',
        ś: 's',
        š: 's',
        û: 'u',
        ü: 'u',
        ù: 'u',
        ú: 'u',
        ū: 'u',
        ÿ: 'y',
        ž: 'z',
        ź: 'z',
        ż: 'z',
    }
    let output = ''
    for (var i = 0; i < s.length; i++) {
        output += accentMap[s.charAt(i)] || s.charAt(i)
    }

    var additional = {
        De: /de/gi,
        "D'": /d'/gi,
    }

    Object.keys(additional).map(n => {
        output = output.replace(additional[n], n)
        return n
    })

    return output
}

export const addComma = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const overrideTeamTricode = tricode => {
    let newTricode = ''
    switch (tricode.toLowerCase()) {
        case 'anh':
            newTricode = 'ANA'
            break
        case 'cls':
            newTricode = 'CLB'
            break
        case 'mon':
            newTricode = 'MTL'
            break
        case 'was':
            newTricode = 'WSH'
            break
        case 'aas':
            newTricode = 'ATL'
            break
        case 'mas':
            newTricode = 'MET'
            break
        case 'cas':
            newTricode = 'CEN'
            break
        case 'pas':
            newTricode = 'PAC'
            break
        case 'nls':
            newTricode = 'NL'
            break
        case 'als':
            newTricode = 'AL'
            break
        default:
            newTricode = tricode
    }
    return newTricode
}

export const defaultLeagueLogo = (imagePath, league) => {
    let defaultImage = ''
    switch (league) {
        case 'nhl':
            defaultImage = 'nhl'
            break
        case 'nfl':
            defaultImage = 'nfl'
            break
        case 'cfl':
            defaultImage = 'cfl'
            break
        default:
            defaultImage = 'tbd'
    }
    if (defaultImage === 'tbd') {
        return `${env_url}/tbd.svg`
    } else {
        return imagePath.replace(
            // eslint-disable-next-line
            /^(.*\/)?[^\/]*\.(png|gif|jpe?g)$/i,
            '$1' + defaultImage + '.$2'
        )
    }
}

export const delayedStatus = (status, league) => {
    let statuses = []

    switch (league) {
        case 'mlb':
            statuses = ['Delayed', 'Postponed', 'Suspended', 'Cancelled', 'Forfeited']
            break
        case 'nhl':
        case 'whc':
        case 'wjc':
            statuses = ['Postponed', 'Suspended', 'Cancelled', 'Delayed']
            break
        case 'nba':
            statuses = [
                'Postponed',
                'Suspended',
                'Forfeit by Away',
                'Forfeit by Home',
                'Forfeit by both teams',
                'Cancelled',
                'Delayed',
            ]
            break
        default:
            return false
    }

    for (var i = 0; i < statuses.length; ++i) {
        if (status === statuses[i]) {
            return true
        }
    }

    return false
}

const cleanTags = content => {
    let story_formatted = content.replace(/ text="/g, '>')
    story_formatted = story_formatted.replace(/"\/>/g, '</p>')
    return story_formatted
}

export const formatStory = story => {
    if (story.type === 'recap' || story.type === 'preview') {
        story = story.content
            .replace(
                /(---)|(More AP (baseball|NBA): https:\/\/apnews.com\/tag\/(MLBbaseball|NBAbasketball))/gi,
                ''
            )
            .replace('--Field Level Media', '')
        story = story.split('More AP ')[0]
    } else {
        story = story.content
    }

    return cleanTags(story)
}

export const getSportFromLeague = league => {
    switch (league) {
        case 'mlb':
            return 'baseball'
        case 'nhl':
            return 'hockey'
        case 'nba':
            return 'basketball'
        case 'nfl':
        case 'cfl':
            return 'football'
        default:
            return ''
    }
}

export const getPlayerURL = (first_name, last_name, id, league_arg = false) => {
    const league = league_arg ? league_arg : window.location.pathname.split('/')[2]
    const sport = getSportFromLeague(league)
    const formatName = name => {
        // eslint-disable-next-line
        let punctuationless = name.replace(/[.',\/#!$%\^&\*;:{}=\-_`~()]/g, '')
        let finalString = punctuationless.replace(/\s{2,}/g, ' ').toLowerCase()
        return finalString
    }

    let perm = `/${sport}/${league}/players/${formatName(first_name)}-${formatName(
        last_name
    )}/${id}`

    return perm
}

/*
 * getTeamURL: returns link to the team profile page
 * @param {string} city - Team City
 * @param {string} name - Team Name
 * @return {string} - url
 */
export const getTeamURL = (city = '', name = '', league_arg = false) => {
    const league = league_arg ? league_arg : window.location.pathname.split('/')[2]
    const sport = getSportFromLeague(league)
    return `/${sport}/${league}/teams/${city.toLowerCase()}-${name.toLowerCase()}/`
        .replace(' ', '-')
        .replace('.', '')
}

/*
 * sanitizeString: removes all special characters and converts spaces to dashes
 * @param {string} str - string to be sanitized
 * @return {string} - sanitized string
 */
export const sanitizeString = str => {
    return str
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
        .replace(/ /g, '-')
        .toLowerCase()
}

/*
 * statsSeeAll: Returns link to the players page with sorting params.
 * @param {string} season - 2017, 2018, ...
 * @param {string} seasonType - 'post', 'reg', 'pre'
 * @param {string} tab - page tab that the link should land on
 * @return {string} url
 */
export const statsSeeAll = (season, seasonType, tab, column = null, sort = null, dir = null) => {
    const league = window.location.pathname.split('/')[2]
    const sport = getSportFromLeague(league)
    return `/${sport}/${league}/players/?season=${season}&?seasonType=${seasonType}&tab=${tab}${
        column ? '&column=' + column : ''
    }${sort ? '&sort=' + sort : ''}${dir ? '&dir=' + dir : ''}`
}

/*
 * formatStat: Format numbers based on number of decimal places, leading zeros, etc.
 * @param {string/num} data - to be formatted
 * @param {boolean} leadingZero - 0.992 (instead of .992)
 * @param {boolean} appendPlus - for Plus/Minus data
 * @return {string/num} - formatted data
 */
export const formatStat = (
    data,
    decimalPlaces = 0,
    leadingZero = true,
    appendPlus = false,
    switchSign = false
) => {
    let newData = (+data).toFixed(decimalPlaces)
    if (!leadingZero) {
        newData = newData.replace(/^0./, '.')
    }
    if (appendPlus && newData > 0) {
        newData = '+' + newData
    }
    if (switchSign && newData < 0) {
        newData = newData.replace(/^-/, '+')
    }
    return newData
}

/*
 * overrideTeamName: Returns team city or overrides it based on the tricode.
 * @param {string} tricode - Team tricode
 * @param {string} tricode - Team city
 * @param {string} tricode - league
 * @return {string} name - Team name
 */
export const overrideTeamName = (tricode, city, league = 'nhl') => {
    tricode = tricode.toLowerCase()

    if (league === 'nhl') {
        switch (tricode) {
            case 'nyr':
                return 'NY Rangers'
            case 'nyi':
                return 'NY Islanders'
            default:
                return city
        }
    }

    if (league === 'mlb') {
        switch (tricode) {
            case 'chc':
                return 'CHI Cubs'
            case 'cws':
                return 'CHI White Sox'
            case 'laa':
                return 'LA Angels'
            case 'lad':
                return 'LA Dodgers'
            case 'nyy':
                return 'NY Yankees'
            case 'nym':
                return 'NY Mets'
            default:
                return city
        }
    }

    if (league === 'nba') {
        switch (tricode) {
            case 'lal':
                return 'LA Lakers'
            case 'lac':
                return 'LA Clippers'
            default:
                return city
        }
    }

    if (league === 'nfl') {
        switch (tricode) {
            case 'nyj':
                return 'NY Jets'
            case 'nyg':
                return 'NY Giants'
            case 'lar':
                return 'LA Rams'
            case 'lac':
                return 'LA Chargers'
            default:
                return city
        }
    }

    return city
}

/*
 * getWeeks: Returns season type based on gameType
 * @param {string} gameType - type of a game
 * @return {string} seasonType - {pre, reg}
 * no post type games for football
 */
export const getSeasonType = gameType => {
    switch (gameType.toLowerCase()) {
        case 'regular season':
        case 'first round playoffs':
        case 'second round playoffs':
        case 'division semi-finals':
        case 'conference championships':
        case 'div. championship':
        case 'pro bowl':
        case 'super bowl':
        case 'grey cup':
            return 'reg'
        case 'exhibition':
            return 'pre'
        default:
            return 'reg'
    }
}

/*
 * getWeeks: Returns football weeks for score page
 * @param {league} tricode - Team tricode
 * @return {array} weeks - {week, type, name}
 * no post type games for football
 */
export const getWeeks = league => {
    switch (league.toLowerCase()) {
        case 'nfl':
            return [
                { week: 1, type: 'pre', name: 'Hall of Fame Week' },
                { week: 2, type: 'pre', name: 'Preseason W1' },
                { week: 3, type: 'pre', name: 'Preseason W2' },
                { week: 4, type: 'pre', name: 'Preseason W3' },
                { week: 5, type: 'pre', name: 'Preseason W4' },
                { week: 1, type: 'reg', name: 'Week 1' },
                { week: 2, type: 'reg', name: 'Week 2' },
                { week: 3, type: 'reg', name: 'Week 3' },
                { week: 4, type: 'reg', name: 'Week 4' },
                { week: 5, type: 'reg', name: 'Week 5' },
                { week: 6, type: 'reg', name: 'Week 6' },
                { week: 7, type: 'reg', name: 'Week 7' },
                { week: 8, type: 'reg', name: 'Week 8' },
                { week: 9, type: 'reg', name: 'Week 9' },
                { week: 10, type: 'reg', name: 'Week 10' },
                { week: 11, type: 'reg', name: 'Week 11' },
                { week: 12, type: 'reg', name: 'Week 12' },
                { week: 13, type: 'reg', name: 'Week 13' },
                { week: 14, type: 'reg', name: 'Week 14' },
                { week: 15, type: 'reg', name: 'Week 15' },
                { week: 16, type: 'reg', name: 'Week 16' },
                { week: 17, type: 'reg', name: 'Week 17' },
                { week: 18, type: 'reg', name: 'Wild Card Weekend' },
                { week: 19, type: 'reg', name: 'Div. Playoffs' },
                { week: 20, type: 'reg', name: 'Conf. Championships' },
                { week: 21, type: 'reg', name: 'Pro Bowl' },
                { week: 22, type: 'reg', name: 'Super Bowl' },
            ]
        case 'cfl':
            return [
                { week: 1, type: 'pre', name: 'Exhibition W1' },
                { week: 2, type: 'pre', name: 'Exhibition W2' },
                { week: 3, type: 'pre', name: 'Exhibition W3' },
                { week: 1, type: 'reg', name: 'Week 1' },
                { week: 2, type: 'reg', name: 'Week 2' },
                { week: 3, type: 'reg', name: 'Week 3' },
                { week: 4, type: 'reg', name: 'Week 4' },
                { week: 5, type: 'reg', name: 'Week 5' },
                { week: 6, type: 'reg', name: 'Week 6' },
                { week: 7, type: 'reg', name: 'Week 7' },
                { week: 8, type: 'reg', name: 'Week 8' },
                { week: 9, type: 'reg', name: 'Week 9' },
                { week: 10, type: 'reg', name: 'Week 10' },
                { week: 11, type: 'reg', name: 'Week 11' },
                { week: 12, type: 'reg', name: 'Week 12' },
                { week: 13, type: 'reg', name: 'Week 13' },
                { week: 14, type: 'reg', name: 'Week 14' },
                { week: 15, type: 'reg', name: 'Week 15' },
                { week: 16, type: 'reg', name: 'Week 16' },
                { week: 17, type: 'reg', name: 'Week 17' },
                { week: 18, type: 'reg', name: 'Week 18' },
                { week: 19, type: 'reg', name: 'Week 19' },
                { week: 20, type: 'reg', name: 'Week 20' },
                { week: 21, type: 'reg', name: 'Week 21' },
                { week: 22, type: 'reg', name: 'Div. Semi-Finals' },
                { week: 23, type: 'reg', name: 'Div. Finals' },
                { week: 24, type: 'reg', name: 'Grey Cup' },
            ]
        default:
            return []
    }
}

export const ordinalSuffix = i => {
    const j = i % 10,
        k = i % 100
    if (j === 1 && k !== 11) {
        return i + 'st'
    }
    if (j === 2 && k !== 12) {
        return i + 'nd'
    }
    if (j === 3 && k !== 13) {
        return i + 'rd'
    }
    return i + 'th'
}

export const formatMoney = (amount, decimalCount = 0, decimal = '.', thousands = ',') => {
    try {
        decimalCount = Math.abs(decimalCount)
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount

        const negativeSign = amount < 0 ? '-' : ''

        let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString()
        let j = i.length > 3 ? i.length % 3 : 0

        return (
            negativeSign +
            (j ? i.substr(0, j) + thousands : '') +
            i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
            (decimalCount
                ? decimal +
                  Math.abs(amount - i)
                      .toFixed(decimalCount)
                      .slice(2)
                : '')
        )
    } catch (e) {
        console.log(e)
    }
}

/**
 * getTeamNameById: Returns team name slug from the map when team id and league is provided
 * optional title formatting available by passing boolean
 * @param {number} teamId
 * @param {string} league
 * @param {boolean} title
 */

export function getTeamNameById(teamId, league, title = false) {
    let teamNameFromMap

    const titleCase = str => {
        return str
            .split('-')
            .map(x => x[0].toUpperCase() + x.slice(1))
            .join(' ')
    }

    switch (league) {
        case 'nhl':
            nhlTeamNameIDArrayMap.forEach((teamName, id) => {
                if (id === teamId) {
                    teamNameFromMap = title ? titleCase(teamName) : teamName
                }
            })
            break
        case 'mlb':
            mlbTeamNameIDArrayMap.forEach((teamName, id) => {
                if (id === teamId) {
                    teamNameFromMap = title ? titleCase(teamName) : teamName
                }
            })
            break
        case 'nba':
            nbaTeamNameIDArrayMap.forEach((teamName, id) => {
                if (id === teamId) {
                    teamNameFromMap = title ? titleCase(teamName) : teamName
                }
            })
            break
        case 'cfl':
            cflTeamNameIDArrayMap.forEach((teamName, id) => {
                if (id === teamId) {
                    teamNameFromMap = title ? titleCase(teamName) : teamName
                }
            })
            break
        case 'nfl':
            nflTeamNameIDArrayMap.forEach((teamName, id) => {
                if (id === teamId) {
                    teamNameFromMap = title ? titleCase(teamName) : teamName
                }
            })
            break
        default: {
            return ''
        }
    }
    return teamNameFromMap
}

export function numberOfdecimalPlaces(num) {
    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)
    if (!match) {
        return 0
    }
    return Math.max(
        0,
        // Number of digits right of decimal point.
        (match[1] ? match[1].length : 0) -
            // Adjust for scientific notation.
            (match[2] ? +match[2] : 0)
    )
}

/*
 * getNestedObjValueByString: Returns nested object value based on a string reference
 * @param {object} o - initial object
 * @param {string} s - nested param reference ex. 'data.details.id'
 * @return {mixed}
 */
export function getNestedObjValueByString(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1')
    s = s.replace(/^\./, '')
    var a = s.split('.')
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i]
        if (k in o) {
            o = o[k]
        } else {
            return
        }
    }
    return o
}

export function decodeEntities(str) {
    // https://stackoverflow.com/questions/5796718/html-entity-decode
    let element = document.createElement('div')

    if (str && typeof str === 'string') {
        // strip script/html tags
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '')
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '')
        element.innerHTML = str
        str = element.textContent
        element.textContent = ''
    }

    return str
}

const playerProfileEnabled = ['mlb', 'nhl', 'nba', 'nfl']

export const spaPlayerEnabled = league => {
    return playerProfileEnabled.includes(league)
}

export const enableSPAifUrlMatch = currentPath =>
    playerProfileEnabled.some(x => currentPath.includes(x))

/*
 * removeTrailingSlash: remove trailing slash from strings
 * @param {string} str - string (usually URL)
 * @return {string}
 */
export const removeTrailingSlash = str => {
    if (!str) return str
    return str.replace(/\/+$/, '')
}

/*
 * removeDomain: remove domain from URL
 * @param {string} url - url string
 * @return {string}
 */
export const removeDomain = url => {
    if (!url) return url
    return url.replace(/^.*\/\/[^/]+/, '')
}

export const getPlayerImageURL = (id, size = 'sm') => {
    if (!id) return ''
    let size_conversions = {
        xs: 280,
        sm: 480,
        md: 780,
        lg: 1080,
    }
    return `${player_image_url}/${size_conversions[size]}/${id}.png`
}

export const toTitleCase = str => {
    if (!str) return ''
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
}

export const flattenObject = (ob, top_param = null) => {
    var toReturn = {}

    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue

        if (typeof ob[i] == 'object' && ob[i] !== null) {
            var flatObject = flattenObject(ob[i], top_param)
            let id = i
            let index_id = ''
            let x_prefix = ''

            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue

                /// optinally use object param/value structure instead of index - must be top level object param!
                if (top_param && x === top_param) {
                    id = top_param
                    index_id = flatObject[x]
                    x_prefix = index_id + '.'
                } else {
                    toReturn[id + '.' + x_prefix + x] = flatObject[x]
                }
            }
        } else {
            toReturn[i] = ob[i]
        }
    }
    return toReturn
}
