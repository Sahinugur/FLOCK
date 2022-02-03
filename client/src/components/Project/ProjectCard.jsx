
// import React, { useState, useEffect } from "react";
// // import {useNavigate} from "react-router-dom";
// import makeCall from "../../api/Call";
// import env from "../../api/env";
// import {useForm} from "react-hook-form";
// import {Wrapper, ProjectContainer} from "./projectCard.styled";
// // import {ProjectContainer} from "./projectCard.styled";


// export default function ProjectCard() {
//     const [projects, setProject] = useState([]);

//     // useEffect(() => {
//     //     makeCall(env.PROJECTS).then((result) => {
//     //         setProject(result);
//     //     });
//     // }, []);

//     async function getProject(){
//         makeCall(env.PROJECTS).then((result) => {
//             setProject(result);
//         })
//     }
    
    


//     // const {data, setData} = useState({title:'', password:'', size_of_project:'', participants: '', type_of_project: '', technologies: '', stage_of_project: '', add_link: '', few_words: ''});
//     // const {register, handleSubmit, errors} = useForm({
//     //     defaultValues: {
//     //         title: data.title,
//     //         password: data.password,
//     //         size_of_project: data.size_of_project,
//     //         participants: data.participants,
//     //         type_of_project: data.type_of_project,
//     //         technologies: data.technologies,
//     //         stage_of_project: data.stage_of_project,
//     //         add_link: data.add_link,
//     //         few_words: data.few_words
//     //     },
//     //     reValidateMode: "onFocus"
//     // });




//     /** READ MORE SHOW LESS BUTTON */
//     const ReadMore = ({children}) => {
//         const text = children;
//         const [isReadMore, setIsReadMore] = useState(true);
//         const toggleReadMore = () => {
//             setIsReadMore(!isReadMore);
//         };
//         return (
//             <p className="text">
//                 {isReadMore ? text.slice(0, 10) : text}
//                 <span onClick={toggleReadMore} className="read-or-hide">
//                 {isReadMore ? "...read more" : " show less"}
//                 </span>
//             </p>
//         );
//     };


//     return (
//         <div>
//             <Wrapper>
//                 <h3>projects rule</h3>
//                 {projects.map((project, index) =>{
//                     return (
//                         <ProjectContainer key={index}>
//                             <ReadMore>
//                                 <p>
//                                     <h4>{project.title}</h4>                                
//                                     <h5>{project.founder}</h5>
//                                     <h5>{project.type_of_project}</h5>
//                                 </p>
//                             </ReadMore>
//                         </ProjectContainer>
//                     )
//                 })}
//             </Wrapper>
//         </div>
//     )
// }