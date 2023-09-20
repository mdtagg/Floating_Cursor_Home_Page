export function handleEvent(e:React.MouseEvent<HTMLDivElement, MouseEvent>,setCursorEvent:React.Dispatch<React.SetStateAction<React.MouseEvent<HTMLDivElement, MouseEvent> | null>>) {
    if(setCursorEvent) {
        setCursorEvent(e)
    }
}