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
                key="src\assets\pexels_videos_1851190 (540p).mp4"
                src="src\assets\pexels_videos_1851190 (540p).mp4"
            />
            :
            <Video
                key="src\assets\production_id_4585175 (1440p) (1).mp4"
                src="src\assets\production_id_4585175 (1440p) (1).mp4"
            />
            }
        </div>
    )
}

export { Landing }

