import React, { useState } from "react";
import "./ProjectCard.css";

export default function ProjectCard({pdata}) {
    const [project, setProject] = useState(pdata);

    /** READ MORE SHOW LESS BUTTON */
    // const ReadMore = ({children}) => {
    //     const text = children;
    //     const [isReadMore, setIsReadMore] = useState(true);
    //     const toggleReadMore = () => {
    //         setIsReadMore(!isReadMore);
    //     };
    //     return (
    //         <p className="text">
    //             {isReadMore ? text.slice(0, 10) : text}
    //             <span onClick={toggleReadMore} className="read-or-hide">
    //             {isReadMore ? "...read more" : " show less"}
    //             </span>
    //         </p>
    //     );
    // };


    return (
        <div className="pr_card_container">
            <div className="pr_card_body">
                <h2 className="pr_card_title">{project && project.title}</h2>
            </div>
        </div>
    )
}
