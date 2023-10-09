import "./index.css"

const Landing = () => {

    return (
        <div
            className="video-container"
        >
            <video
                className="video"
                width={`${window.innerWidth}px`}
                autoPlay
                muted
                // loop
            >
                <source
                    src="src\assets\178732 (1080p).mp4"
                ></source>
            </video>
        </div>
    )
}

export { Landing }