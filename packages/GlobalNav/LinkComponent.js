import React from 'react'

export default function LinkComponent({ url, onClick, children, singlePageNavigation, isNavLink, isExact, withNavProps, router, ...other } ) {

    const DefaultLink = ({children, url, onClick}) => <a href={url} onClick={onClick} >{children}</a>;
    
    let RouterLink;
    let RouterNavLink;

    if (withNavProps) {
        RouterLink = withNavProps.link;
        RouterNavLink = withNavProps.navlink;
    } else {
        RouterLink = DefaultLink;
        RouterNavLink = DefaultLink;
    }

    return !singlePageNavigation || !router ? (
        <a href={url} onClick={onClick} {...other}>
            {children}
        </a>
    ) : (
        <React.Fragment>
            {!isNavLink && (
                <RouterLink to={url} onClick={onClick} {...other}>
                    {children}
                </RouterLink>
            )}
            {isNavLink && (
                <RouterNavLink exact={isExact} to={url} onClick={onClick} {...other}>
                    {children}
                </RouterNavLink>
            )}
        </React.Fragment>
    )
}
