import React from 'react'

import styles from './GlobalNav.module.scss';

const GlobalNavLeagues = ({ modalMenuClose, modal_menu_list, ancillarySportsLeaguesMap }) => {
    return (
        <React.Fragment>
            <ul className={styles.league_list}>
                {modal_menu_list &&
                    modal_menu_list.map(item => {
                        let url_sport = ancillarySportsLeaguesMap[item.slug] || ''
                        let img_sport = ancillarySportsLeaguesMap[item.slug] || ''
                        let file_name = item.slug

                        if (url_sport === 'juniors') {
                            url_sport = 'juniors'
                            img_sport = 'hockey'
                            file_name = item.slug + '-logo'
                        }

                        return (
                            <li className={styles.list_item} key={item.term_id}>
                                <a href={`/${url_sport}/${item.slug}`} onClick={modalMenuClose}>
                                    <img
                                        src={`https://images.rogersdigitalmedia.com/www.sportsnet.ca/team_logos/90x90/${img_sport}/${item.slug}/${file_name}.png`}
                                        alt={item.name + ' logo'}
                                    />
                                    <p>{item.name}</p>
                                </a>
                            </li>
                        )
                    })}
            </ul>
        </React.Fragment>
    )
}

export default GlobalNavLeagues
