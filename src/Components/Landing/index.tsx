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
                key=".\pexels_videos_1851190 (540p).mp4"
                src=".\pexels_videos_1851190 (540p).mp4"
            />
            :
            <Video
                key=".\production_id_4585175 (1440p) (1).mp4"
                src=".\production_id_4585175 (1440p) (1).mp4"
            />
            }
        </div>
    )
}

export { Landing }

