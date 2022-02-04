const Spinner = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg"
             xmlns="http://www.w3.org/1999/xlink" version="1.0" width="64px" height="64px" viewBox="0 0 128 128"
             xml="preserve">
            <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" />
            <g>
                <path fill="#b8b8b8" d="M99.359,10.919a60.763,60.763,0,1,0,0,106.162A63.751,63.751,0,1,1,99.359,10.919Z"/>
                <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1080ms" repeatCount="indefinite"></animateTransform>
            </g>
            <g>
                <path fill="#6a6a6a" d="M28.641,117.081a60.763,60.763,0,1,0,0-106.162A63.751,63.751,0,1,1,28.641,117.081Z"/>
                <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1620ms" repeatCount="indefinite"></animateTransform>
            </g>
            <g>
                <path fill="#000000" d="M117.081,99.313a60.763,60.763,0,1,0-106.162,0A63.751,63.751,0,1,1,117.081,99.313Z"/>
                <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="3240ms" repeatCount="indefinite"></animateTransform>
             </g>
        </svg>
    )
}

export default Spinner;