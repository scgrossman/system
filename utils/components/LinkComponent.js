import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function LinkComponent(props) {
    const { url, onClick, children, singlePageNavigation, isNavLink, isExact, ...other } = props

    return !singlePageNavigation ? (
        <a href={url} onClick={onClick} {...other}>
            {children}
        </a>
    ) : (
        <React.Fragment>
            {!isNavLink && (
                <Link to={url} onClick={onClick} {...other}>
                    {children}
                </Link>
            )}
            {isNavLink && (
                <NavLink exact={isExact} to={url} onClick={onClick} {...other}>
                    {children}
                </NavLink>
            )}
        </React.Fragment>
    )
}
