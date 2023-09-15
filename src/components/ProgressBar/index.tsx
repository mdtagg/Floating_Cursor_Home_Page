
export interface TProgressBar {
    scrollPosition:number
}

const ProgressBar = (props:TProgressBar) => {

    const { scrollPosition } = props

    return (
        <div className="progress-bar-container">
            <span 
                className="progress-bar-thumb" 
                style={{"left":`${scrollPosition}%`}}
            ></span>
        </div>
    )
}

export default ProgressBar