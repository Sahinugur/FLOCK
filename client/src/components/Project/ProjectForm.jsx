import React, { useContext, useState } from "react";
import makeCall from "../../api/Call";
import env from "../../api/env";
import { ChatContext } from "../../context/SharedContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
        title: yup
            .string()
            .required(),
        founder: yup
            .string()
            .required(),
        size_of_project: yup
            .string(),
        participants: yup
            .string(),
        type_of_project: yup
            .string(),
        technologies: yup
            .string(),
        stage_of_project: yup
            .string(),
        add_link: yup
            .string(),
        few_words: yup
            .string()
    })
    .required(); 

    
export default function ProjectForm() {
    const { state, dispatch } = useContext(ChatContext);

    const [errorMsg, setErrorMsg] = useState("");

    const {register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: "onFocus",
    });
        
    // const { dispatch } = useContext(ChatContext);
    let navigate = useNavigate();

    // async function logProject(logs) {
    //         // e.preventDefault();
    //         console.log("hello logs");
        
    //         await makeCall(env.LOGPROJECT, "POST", logs)
    //         .then((result) => {
    //         dispatch({type: "AUTHENTICATED", payload: result.project})
    //         console.log(`result.status`, result);
    //         if(result.status) {
    //             navigate(`/projects`)
    //         } else {
    //             setErrorMsg(result.msg)
    //         }
    //     }); 
    // }

    async function getProjects(e) {
        try {
            const result = await makeCall(env.PROJECTS);
            console.log("hello",result);
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = (d)=>{console.log("onSubmit",d);}

    return (
        <div className="logProjectForm">
            <form 
            onSubmit={handleSubmit(onSubmit)}
            className="form" 
            >
                <h1>Log your project</h1>
                <label htmlFor="title"> Title:
                </label>
                    <input
                        type="text"
                        // placeholder="Title"
                        id="title"
                        name="projectTitle"
                        {...register("title", { required: "Please provide title of your project" })}
                    />
                <p>{errors.title?.message}</p>
{/* 
                <label htmlFor="password">Password:
                </label>
                    <input
                        type="password"
                        // placeholder="Password"
                        id="password"
                        name="projectPassword"
                        {...register("password", { required: "No password provided" })}
                    />
                <p>{errors.password?.message}</p> */}

                <label htmlFor="founder">Founder:
                </label>
                    <input
                        type="text"
                        id="founder"
                        name="founder"
                        value={state.user._id}
                        {...register("founder", { required: "Please provide username" })}
                    />
                <p>{errors.password?.message}</p>

                <p>Size of project:</p>
                <label htmlFor="size_small">
                    <input
                        {...register("size_of_project")}
                        type="radio"
                        name="size_of_project"
                        value="small"
                        id="size_small"
                    />
                    small
                </label>
                <label htmlFor="size_medium">
                    <input
                        {...register("size_of_project")}
                        type="radio"
                        name="size_of_project"
                        value="medium"
                        id="size_medium"
                    />
                    medium
                </label>
                <label htmlFor="size_large">
                    
                    <input
                        {...register("size_of_project")}
                        type="radio"
                        name="size_of_project"
                        value="large"
                        id="size_large"
                    />
                    large
                </label>

                <label htmlFor="participants">Add participants:
                </label>
                    <input
                        {...register("participants")}
                        type="text"
                        name="participants"
                        id="participants"
                    />
                    

                <label htmlFor="type_of_project">Select type of project
                </label>
                    <select 
                        {...register("type_of_project")} defaultValue={'DEFAULT'}
                        name="type_of_project"
                        id="type_of_project">
                        <option value="DEFAULT" disabled>Select...</option>
                        <option value="static_web_apps">Static Web Apps</option>
                        <option value="dynamic_web_apps">Dynamic Web Apps</option>
                        <option value="single_page_apps">Single Page Apps</option>
                        <option value="multiple_page_apps">Multiple Page Apps</option>
                        <option value="animated_web_apps">Animated Web Apps</option>
                        <option value="content_management_system">Content Management System</option>
                        <option value="e_commerse_apps">E-commerse Apps</option>
                        <option value="portal_web_apps">Portal Web Apps</option>
                        <option value="progressive_web_apps">Progressive Web Apps</option>
                    </select> 
                    
                

                <label htmlFor="technologies">Technologies:
                </label>
                    <select {...register("technologies")} defaultValue={'DEFAULT'}
                    id="technologies" name="technologies">
                            <option value="DEFAULT" disabled>Select...</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="c">C</option>
                            <option value="c++">C++</option>
                            <option value="javascript">JavaScript</option>
                            <option value="php">PHP</option>
                            <option value="go">Go</option>
                            <option value="r">R</option>
                            <option value="typescript">Typescript</option>
                            <option value="c">c</option>
                            <option value="d">d</option>
                    </select>

                    
                <p>Stage of project:</p>
                <label htmlFor="stage_first_steps">
                    <input
                        {...register("stage_of_project")}
                        type="radio"
                        name="stage_of_project"
                        value="first steps"
                        id="stage_first_steps"
                    />
                    first steps
                </label>

                <label htmlFor="stage_in_construction">
                    <input
                        {...register("stage_of_project")}
                        type="radio"
                        name="stage_of_project"
                        value="in construction"
                        id="stage_in_construction"
                    />
                    in construction
                </label>

                <label htmlFor="stage_done">
                    <input
                        {...register("stage_of_project")}
                        type="radio"
                        name="stage_of_project"
                        value="done"
                        id="stage_done"
                    />
                    done
                </label>

                <label htmlFor="add_link">Add Link:
                </label>
                    <input
                        {...register("add_link")}
                        type="text"
                        name="add_link"
                        id="add_link"
                    />
                    

                <label htmlFor="few_words">
                    <textarea
                        {...register("few_words")}
                        type="text"
                        name="few_words"
                        placeholder="Please share a few words about your project..."
                        id="few_words"
                    />
                </label>
                
                <input type="submit" value="Create" />
                <button onClick={getProjects}>list of projects</button>
            </form>
        </div>
    )
}



