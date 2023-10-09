import "./index.css"
import { useState } from 'react'
import { Video } from "../Video"

const Landing = () => {

    const [ toggleLanding, setToggleLanding ] = useState(false)

    console.log(toggleLanding)
    return (
        <div
            className="video-container"
            onClick={() => setToggleLanding(!toggleLanding)}
        >
            {!toggleLanding ? 
            <Video
                key="src\assets\171110 (720p).mp4"
                src="src\assets\171110 (720p).mp4"
            />
            :
            <Video
                key="src\assets\rock_climbing_-_925 (240p).mp4"
                src="src\assets\rock_climbing_-_925 (240p).mp4"
            />
            }
        </div>
    )
}

export { Landing }