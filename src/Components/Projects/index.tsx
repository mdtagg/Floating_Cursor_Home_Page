import './index.css'
import { useEffect,useRef,useState } from 'react'

const Projects = () => {

    const projectsData = [ 
        "src/assets/pexels-brett-sayles-1574216.jpg",
        "src/assets/pexels-min-an-1543756 (1).jpg",
        "src/assets/pexels-noelle-otto-906094 (1).jpg",
        "src/assets/pexels-pixabay-461593 (1).jpg",
        "src/assets/pexels-riccardo-303040 (1).jpg",
        "src/assets/pexels-анна-рыжкова-3077882 (2).jpg"
     ]

     const invisibleRef = useRef(null)
     const [ test,setTest ] = useState("")
     
     useEffect(() => {
        
        setTest('right')
     },[])

    return (
        projectsData.map((picture,index) => {

            const borderRight = index === projectsData.length - 1 ? "border-right" : ""

            return (
                <>
                <div 
                    ref={invisibleRef}
                    className={`invisible-container ${test}`}></div>
                <div
                    className="container"
                    key={picture}
                    id={picture}
                >
                    <div
                        className={`image-panel ${borderRight}`}
                        key={picture}
                    >
                        <div
                            className="menu-image-container"
                        >
                            <img
                                className="menu-image"
                                src={picture}
                            >
                            </img>
                        </div>
                        
                        <div
                            className="menu-panel-container"
                        >
                            <div className="menu-panel-info">
                                <p>
                                    COMPANY&reg; PROJECT
                                    <br/>
                                    <span 
                                        className="small-font"
                                    >
                                        DESCRIPTION
                                    </span>
                                </p>
                                <p>&copy;2023</p>
                            </div>
                
                            <div
                                className="menu-dropdown-info small-font"
                            >
                                <p className="opacity">
                                    DESCRIPTION: Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                                <a className="opacity">
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
                </>
            )
        })
    )
}

export { Projects }