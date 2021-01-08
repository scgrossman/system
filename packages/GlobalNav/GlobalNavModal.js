import React from 'react'
import GlobalNavTeams from './GlobalNavTeams'
import GlobalNavLeagues from './GlobalNavLeagues'

import styles from './GlobalNav.module.scss';

const GlobalNavModal = ({
    modalMenuClose,
    modal_menu_open_class,
    modal_menu_list,
    modal_menu_type,
    acceptedMajorLeagues,
    ancillarySportsLeaguesMap,
}) => {
    return (
        <div className={`${styles.NavigationModal__cont} ${modal_menu_open_class}`}>
            <div className={styles.team_nav_menu}>
                {modal_menu_type === 'leagues' && (
                    <GlobalNavLeagues
                        modalMenuClose={modalMenuClose}
                        modal_menu_list={modal_menu_list}
                        ancillarySportsLeaguesMap={ancillarySportsLeaguesMap}
                    />
                )}
                {modal_menu_type === 'teams' && (
                    <GlobalNavTeams
                        modalMenuClose={modalMenuClose}
                        modal_menu_list={modal_menu_list}
                        acceptedMajorLeagues={acceptedMajorLeagues}
                    />
                )}
                <div className={styles.team_close_icon} onClick={modalMenuClose}>
                    <svg
                        xmlns="https://www.w3.org/2000/svg"
                        x="15px"
                        y="15px"
                        viewBox="18750 -257 14 14"
                    >
                        <path
                            id="path"
                            style={{ fill: '#000', fillRule: 'evenodd' }}
                            d="M19-17.6,17.6-19,12-13.4,6.4-19,5-17.6,10.6-12,5-6.4,6.4-5,12-10.6,17.6-5,19-6.4,13.4-12Z"
                            transform="translate(18745 -238)"
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default GlobalNavModal
