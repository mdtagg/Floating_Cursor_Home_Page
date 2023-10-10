import "./index.css"
import { useState } from 'react'
import { Video } from "../Video"

const Landing = () => {

    const [ toggleLanding, setToggleLanding ] = useState(false)

    return (
        <div
            className="video-container"
            onClick={() => setToggleLanding(!toggleLanding)}
        >
            {!toggleLanding ? 
            <Video
                key="src\assets\171110 (720p).mp4"
                src="src\assets\clouds_-_57374 (1080p).mp4"
            />
            :
            <Video
                key="src\assets\rock_climbing_-_925 (240p).mp4"
                src="src\assets\production_id_4585175 (1440p) (1).mp4"
            />
            }
        </div>
    )
}

export { Landing }