import React from "react";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gists: {}
        };

        this.getPublicGists = this.getPublicGists.bind(this);
    }

    getPublicGists() {
        fetch('https://api.github.com/gists/public', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            accept: 'application/vnd.github.v3+json',
        })
            .then(res => res.json())
            .then(res => {
                this.setState({gists: res});
                // console.log(res);
            });
    }

    render() {
        let gistList = [];

        if (this.state.gists.length > 0) {
            gistList = this.state.gists.map((gist, index) => {
                return <li>{gist.id}</li>;
            });
        }

        return <div className="content-container" id="homePage">
            <div className="row">
                <span>Search</span>
            </div>
            <div className="row">
                <input onChange={this.getPublicGists} />
            </div>
            <div className="row">
                <ul>
                    {gistList}
                </ul>
            </div>
        </div>
    }
}

export default Home;