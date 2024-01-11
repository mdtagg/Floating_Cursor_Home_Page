import './index.css'
import { useEffect,useState } from 'react'

const Projects = () => {

    const projectsData = [ 
        "/pexels-brett-sayles-1574216.jpg",
        "/pexels-min-an-1543756 (1).jpg",
        "/pexels-noelle-otto-906094 (1)-min.jpg",
        "/pexels-pixabay-461593 (1).jpg",
        "/pexels-riccardo-303040 (1).jpg",
        "/pexels-анна-рыжкова-3077882 (2).jpg"
     ]

     const [ containerPosition, setContainerPosition ] = useState("")
     
     useEffect(() => {
        setContainerPosition("left")
     },[])

    return (
        <>
        {projectsData.map((picture,index) => {

            return (

                <div
                    className={`project-card-container ${containerPosition}`}
                    key={picture}
                >
                    <div
                        className={`project-card-content`}
                    >
                        <div
                            className="image-container"
                        >
                            <img
                                src={picture}
                                height="350px"
                                width="450px"
                            >
                            </img>
                        </div>
                        
                        <div
                            className="project-info-container"
                        >
                            <div 
                                className="project-info"
                            >

                                <p>
                                    COMPANY&reg; PROJECT
                                    <br/>
                                    <span 
                                        className="small-font"
                                    >
                                        DESCRIPTION
                                    </span>
                                </p>

                                <p>
                                    &copy;2023
                                </p>

                            </div>
                
                            <div
                                className="info-popover small-font"
                            >
                                <p>
                                    DESCRIPTION: Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>

                                <a>
                                    VISIT SITE
                                </a>

                            </div>
                            
                        </div>
                    </div>

                    <div
                        className="menu-panel-number"
                    >
                        {`0${index + 1}`}
                        
                    </div>
                    
                </div>
            )
        })}
        </>
    )
}

export { Projects }