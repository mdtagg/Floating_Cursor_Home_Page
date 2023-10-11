import './index.css'

const Projects = () => {

    const projectsData = [ 
        "src/assets/pexels-brett-sayles-1574216.jpg",
        "src/assets/pexels-min-an-1543756 (1).jpg",
        "src/assets/pexels-noelle-otto-906094 (1).jpg",
        "src/assets/pexels-pixabay-461593 (1).jpg",
        "src/assets/pexels-riccardo-303040 (1).jpg",
        "src/assets/pexels-анна-рыжкова-3077882 (2).jpg"
     ]

    // const projectsData = [
    //     {
    //         picture:"src/assets/pexels-brett-sayles-1574216.jpg",
    //         company:"COMPANY",
    //         project:"PROJECT",
    //         date:"2023",
    //         description:"DESCRIPTION",
    //         key:"src/assets/pexels-brett-sayles-1574216.jpg"
    //     },
    //     {
    //         picture:"src/assets/pexels-min-an-1543756 (1).jpg",
    //         company:"COMPANY",
    //         project:"PROJECT",
    //         date:"2023",
    //         description:"DESCRIPTION",
    //         key:"src/assets/pexels-min-an-1543756 (1).jpg"
    //     },
    //     {
    //         picture:"src/assets/pexels-noelle-otto-906094 (1).jpg",
    //     },
    //     {picture:"src/assets/pexels-pixabay-461593 (1).jpg"},
    //     {picture:"src/assets/pexels-riccardo-303040 (1).jpg"},
    //     {picture:"src/assets/pexels-анна-рыжкова-3077882 (2).jpg"}
    // ]

    return (
        projectsData.map((picture,index) => {

            const borderRight = index === projectsData.length - 1 ? "border-right" : ""

            return (
                <div
                    className={`image-panel ${borderRight}`}
                    key={picture}
                >
                    <img
                        className="menu-image"
                        height="350px"
                        width="450px"
                        src={picture}
                    >
                    </img>
                    <div
                        className="menu-panel-info"
                    >
                        <p>COMPANY&reg; PROJECT<br/>DESCRIPTION</p>
                        <p>&copy;2023</p>
                    </div>
                </div>
                
            )
        })
    )
}

export { Projects }