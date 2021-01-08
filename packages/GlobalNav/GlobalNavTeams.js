import React from 'react'

import styles from './GlobalNav.module.scss';

const GlobalNavTeams = ({ modalMenuClose, modal_menu_list, acceptedMajorLeagues }) => {
    return (
        <React.Fragment>
            {modal_menu_list &&
                Object.keys(modal_menu_list).length !== 0 &&
                Object.keys(modal_menu_list).map(item => {
                    const first_groupings = modal_menu_list[item]

                    return (
                        <React.Fragment key={item}>
                            {Object.keys(first_groupings).map(group => {
                                const divisions = first_groupings[group]

                                return (
                                    <div className={styles.team_division_list} key={group}>
                                        <p className={styles.team_division_name}>{group}</p>
                                        <ul className={styles.team_list}>
                                            {Object.keys(divisions).map(division => {
                                                const division_info = divisions[division]
                                                const team_league = division_info.league
                                                const team_sport = acceptedMajorLeagues[team_league]
                                                const team_image_url =
                                                    division_info.team_image_url &&
                                                    `${
                                                        division_info.team_image_url.split(
                                                            'team_logos/'
                                                        )[0]
                                                    }team_logos/90x90/${team_sport}/${team_league}/${
                                                        division_info.team_slug
                                                    }.png`
                                                const team_page_url = `/${team_sport}/${team_league}/teams/${
                                                    division_info.team_slug
                                                }`

                                                return (
                                                    <li
                                                        className={styles.list_item}
                                                        key={division_info.team_slug}
                                                    >
                                                        <a
                                                            href={team_page_url}
                                                            onClick={modalMenuClose}
                                                        >
                                                            <img
                                                                src={team_image_url}
                                                                alt={
                                                                    division_info.team_name +
                                                                    ' logo'
                                                                }
                                                            />
                                                            <p>{division_info.team_name}</p>
                                                        </a>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )
                            })}
                        </React.Fragment>
                    )
                })}
        </React.Fragment>
    )
}

export default GlobalNavTeams
