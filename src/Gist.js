import Tag from "./Tag";
import {useState} from "react";
import {fetchFileContent} from "./extra/GistService";

function Gist (props) {
    const fileName = Object.keys(props.data.files)[0];
    const file = props.data.files[fileName];

    const [fileContent, setFileContent] = useState('');

    const fileClickHandler = event => {
        fetchFileContent(file).then(res => {
                setFileContent({text: res});
            }
        );
    };

    return <div className="gist-card">
        <div>
            {props.data.owner.login}
        </div>
        <hr width="98%"/>
        <div className="file-content" onClick={fileClickHandler}>
            <div className="file-left">
                <div>
                    Filename: {file.filename}
                </div>
                <div>
                    Type: {file.type}
                </div>
                <div>
                    Size: {file.size}
                </div>
            </div>
            <div className="file-right">
                <div>
                    <Tag language={file.language} />
                </div>
        </div>
        </div>
        {fileName && <hr width="98%"/>}
        {fileContent && <div>
            <code>{fileContent.text}</code>
        </div>}
    </div>;
}

export default Gist;