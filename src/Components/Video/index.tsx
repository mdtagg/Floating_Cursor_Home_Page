type TVideoProps = {
    src:string
}

export const Video = (props:TVideoProps) => {

    const { src } = props

    return (
        <video
            className="video"
            width={`${window.innerWidth}px`}
            autoPlay
            muted
            // loop
        >
            <source
                src={src}
            ></source>
        </video>
    )
}
