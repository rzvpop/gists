import React from "react";
import Gist from "./Gist";
import {fetchGists} from "./extra/GistService";
import {debounce} from "lodash";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gists: {},
            forks: {}
        };

        this.getPublicGistsHandler = debounce(this.getPublicGistsHandler.bind(this), 700);
    }

    getPublicGistsHandler(event) {
        const username = event.target.value;

        fetchGists(username).then(res => {
            this.setState({gists: res});
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentWillUnmount() {
    }

    render() {
        let gistList = [];

        if (this.state.gists.length > 0) {
            gistList = this.state.gists.map((gist, index) => {
                return <div>
                    <Gist forks={[]} data={gist} />
                </div>;
            });
        }

        return <div className="content-container" id="homePage">
            <div className="row">
                <span>Search</span>
            </div>
            <div className="row">
                <input onChange={this.getPublicGistsHandler} />
            </div>
            {gistList && <div className="row">
                {gistList}
            </div>}
        </div>
    }
}

export default Home;