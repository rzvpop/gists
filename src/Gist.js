import Tag from "./Tag";
import {useState} from "react";
import {fetchFileContent} from "./extra/GistService";

function Gist (props) {
    const fileName = Object.keys(props.data.files)[0];
    const file = props.data.files[fileName];

    const [fileContent, setFileContent] = useState('');

    const fileClickHandler = event => {
        if (!fileContent.text) {
            fetchFileContent(file).then(res => {
                    setFileContent({text: res});
                }
            );
        } else {
            setFileContent({text: ''});
        }
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
                <div>
                    {props.forks}
                </div>
            </div>
            <div className="file-right">
                {file.language && <div>
                    <Tag language={file.language}/>
                </div>}
        </div>
        </div>
        {fileContent.text && <hr width="50%"/>}
        {fileContent.text && <div>
            <code>{fileContent.text}</code>
        </div>}
    </div>;
}

export default Gist;