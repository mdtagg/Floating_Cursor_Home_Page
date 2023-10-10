import "./index.css"

export type TProgressBar = {
    scrollWidth:number 
    scrollPosition:number
}

const ProgressBar = (props:TProgressBar) => {

    const { scrollWidth, scrollPosition } = props

    return (
        <div className="progress-bar-container">
            <div 
                className="progress-bar-track"
            >
                <span 
                    className="progress-bar-slider" 
                    style={{
                        "width":`${scrollWidth}%`,
                        "left":`${scrollPosition}%`
                    }}
                ></span>
            </div>
        </div>
    )
}

export { ProgressBar }