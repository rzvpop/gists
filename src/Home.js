import React, {useMemo} from "react";
import Gist from "./Gist";
import {fetchGists} from "./extra/GistService";
import {debounce} from "lodash";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gists: {}
        };

        this.getPublicGistsHandler = debounce(this.getPublicGistsHandler.bind(this), 300);
    }

    getPublicGistsHandler(event) {
        const username = event.target.value;

        fetchGists().then(res => {
            let gists = [];

            if (Array.isArray(res) && res.length > 0) {
                gists = res.filter(gist => {
                    return gist.owner.login === username;
                });
            }

            this.setState({gists: gists});
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
                    <Gist data={gist} />
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
            <div className="row">
                {gistList}
            </div>
        </div>
    }
}

export default Home;