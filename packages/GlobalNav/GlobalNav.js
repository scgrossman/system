import React, { Component } from "react";

class GlobalNav extends Component {
  
state = {
    data: {
      left: [],
      right: []
    }
  };

  componentDidMount() {
    fetch("https://int-www.sportsnet.ca/wp-json/sportsnet/v1/menu", {
      crossDomain: true,
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render() {
    const { left, right } = this.state.data;
    return (
      <div
        id="nav-sticky"
        class="container-fluid main-container-black has-subnav is_sticky"
      >
        <div class="container-fluid row content-container" id="nav-container">
          <div class="col-xs-12" id="global-nav-container">
            <nav class="navbar navbar-inverse row" role="navigation">
              <section class="navbar-header">
                <a class="sn-nav-logo" href="/">
                  Sportsnet
                </a>{" "}
                <button
                  type="button"
                  class="navbar-toggle"
                  data-toggle="offcanvas"
                  data-target="#bs-example-navbar-collapse-1"
                >
                  <div id="nav-mobile-button" class="nav-mobile-button" />
                </button>
                <a class="sn-video-link hidden" href="/videos/">
                  Video
                </a>
              </section>
              <section
                class="collapse navbar-collapse sidebar-offcanvas"
                id="bs-example-navbar-collapse-1"
              >
                <form
                  class="hidden-lg hidden-xlg navbar-mobile-search"
                  role="search"
                  method="get"
                  action="/search/"
                >
                  <section class="input-group">
                    <input
                      type="text"
                      class="global-nav-search"
                      placeholder="Search"
                      name="s"
                      id="search-input-mobile"
                    />
                    <div class="global-nav-search-btn" />
                  </section>
                </form>

                <ul id="menu-genesis-main-nav-left" class="nav navbar-nav">
                  {left.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="menu-item-1982495 dropdown-no-children"
                        >
                          <a href={item.url}>{item.title}</a>
                        </li>
                      );
                    })}
                </ul>
                <ul id="menu-genesis-main-nav-right" class="nav navbar-nav">
                  {right.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="menu-item-1982495 dropdown-no-children"
                        >
                          <a href={item.url}>{item.title}</a>
                        </li>
                      );
                    })}
                </ul>
                <section class="collapse navbar-collapse navbar-spyglass">
                  <form
                    class="form-horizontal hidden-xs"
                    role="search"
                    method="get"
                    action="/search/"
                  >
                    <section class="input-group">
                      <div class="spyglass-search-icon">
                        <svg class="search-icon light">
                          <use href="/wp-content/themes/sportsnet-nhl/images/combined-icons.svg#search" />
                        </svg>
                      </div>
                    </section>
                  </form>
                </section>
              </section>
            </nav>
            <div class="clearfix" />
          </div>
          <div class="clearfix" />
        </div>
        <div class="clearfix" />
      </div>
    );
  }
}

export default GlobalNav;
