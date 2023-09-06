import "./index.css"
import { useState,useRef,useEffect } from "react"

const Carosel = () => {

    const companies = [
        {
            "title":"Google",
            "content": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, neque esse dolorem quisquam tempora, tempore ipsum inventore unde eos sed illum numquam harum? Ut, dolore? In mollitia facere vitae sunt?"
        },
        {
            "title":"KFC",
            "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste doloribus cumque possimus? Maxime, qui, neque recusandae voluptatum ducimus necessitatibus ut sed maiores iure repellat porro sequi nobis modi? Vitae, quia."
        },
        {
            "title": "Wilson",
            "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid odit eaque voluptatibus iste? Eos dolores minima quaerat quisquam porro dolor, natus commodi provident praesentium tempora architecto accusantium optio? Aliquam, quasi!"
        },
        {
            "title": "AT&T",
            "content": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus laboriosam quae dolore corporis voluptatum quasi, at eveniet qui laudantium sed harum cumque odio rerum a reiciendis cum aliquam suscipit accusamus!"
        },
        {
            "title": "Patagonia",
            "content": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A reprehenderit quaerat corrupti fuga ullam voluptates, sapiente aliquid repellat ad accusantium doloribus odit. Voluptatibus quas natus perspiciatis perferendis pariatur itaque necessitatibus."
        }
    ]
    
    const bar = useRef<HTMLUListElement | null>(null)

    function handleScroll(e:React.UIEvent<HTMLUListElement, UIEvent>) {
        const target = e.target as HTMLUListElement
        const maxScroll = target.scrollWidth - target.clientWidth
        const scrollPosition = ((maxScroll - target.scrollLeft) / maxScroll) * 100
        const adjusted = (100 - scrollPosition) * .4
        bar.current!.style.left = `${adjusted}%`
    }

    return (
        <div className="carosel-container">
            <ul className="carosel-stage" onScroll={(e) => handleScroll(e)}>
            {companies.map(company => {
                return (
                    <div className="carosel-panel">
                        <p>{company.title}</p>
                        <div>_</div>
                        <div>
                            <p>{company.title}</p>
                            <p className="carosel-content">{company.content}</p>
                        </div>
                    </div>
                )
            })}
            </ul>
            <div className="progress-bar-container">
                <span ref={bar} className="progress-bar-thumb" style={{"width":"60%"}}></span>
            </div>
            
        </div>
    )
}

export default Carosel