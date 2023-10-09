import { v4 as uuidv4 } from 'uuid'

function getNavLinks() {
    return ['WORK','ABOUT','NEWS','THINKING','CAREERS','CONTACT'].map(link => {
        return [link,uuidv4()]
    })
}

export const navList = getNavLinks()