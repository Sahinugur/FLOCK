import React, { useContext } from "react";
import makeCall from "../api/Call";
import env from "../api/env";
import { ChatContext } from "../context/SharedContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
        title: yup
            .string()
            .required("Please provide title of your project"),
        password: yup
            .string()
            .required("No password provided")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
            "Password should include at least one uppercase character one number and one special character"),
        size_of_project: yup
            .string(),
        participants: yup
            .string(),
        type_of_project: yup
            .string(),
        technologies: yup
            .array,
        stage_of_project: yup
            .string(),
        upload_files: yup
            .string(),
        few_words: yup
            .string()
    })
    .required(); 

    
export default function Project() {

    const {register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: "onFocus",
    });
        
    const { dispatch } = useContext(ChatContext);
    let navigate = useNavigate();

    async function logProject(logs) {
        try {
            // e.preventDefault();
            await makeCall(env.LOGPROJECT, "POST", logs)
            .then((result) => {
            console.log(`resultProject`, result.errors);
            });
    
            navigate(`/projects`);
        } catch (error) {
            console.log(error);
        }
    }

    async function getUsers(e) {
        try {
            const result = await makeCall(env.USERS);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="logProjectForm">
            <form 
            onSubmit={handleSubmit((data) => logProject(data))}
            className="form" 
            >
                <h1>Log your project</h1>
                <label htmlFor="title">
                    <input
                        type="text"
                        // placeholder="Title"
                        id="title"
                        name="projectTitle"
                        {...register("title", { required: "Please provide title of your project" })}
                    />
                    Title:
                </label>
                <p>{errors.title?.message}</p>

                <label htmlFor="password">
                    <input
                        type="password"
                        // placeholder="Password"
                        id="password"
                        name="projectPassword"
                        {...register("password", { required: "No password provided" })}
                    />
                    Password:
                </label>
                <p>{errors.password?.message}</p>

                <label htmlFor="size_of_project">
                    <input
                        {...register("size")}
                        type="radio"
                        name="size"
                        value="small"
                        id="size_of_project"
                    />
                    small
                </label>
                <label htmlFor="size_of_project">
                    <input
                        {...register("size")}
                        type="radio"
                        name="size"
                        value="medium"
                        id="size_of_project"
                    />
                    medium
                </label>
                <label htmlFor="size_of_project">
                    <input
                        {...register("size")}
                        type="radio"
                        name="size"
                        value="large"
                        id="size_of_project"
                    />
                    large
                </label>

                <label htmlFor="participants">
                    <input
                        {...register("participants")}
                        type="text"
                        name="participants"
                        id="participants"
                    />
                    Add participants:
                </label>

                <label htmlFor="type_of_project">
                    <select 
                        {...register("type_of_project")}
                        name="type_of_project"
                        id="type_of_project"
                        options={["Static Web Apps", "Dynamic Web Apps", "Single Page Apps", "Multiple Page Apps", "Animated Web Apps", "Content Management System", "E-commerse Apps", "Portal Web Apps", "Progressive Web Apps"]}
                        
                    />
                Select type of project
                </label>

                <label htmlFor="technologies">
                    <input
                        {...register("technologies")}
                        type="text"
                        name="technologies"
                        id="technologies"
                    />
                    Technologies:
                </label>

                <label htmlFor="stage_of_project">
                    <input
                        {...register("stage")}
                        type="radio"
                        name="stage"
                        value="first steps"
                        id="stage_of_project"
                    />
                    first steps
                </label>

                <label htmlFor="stage_of_project">
                    <input
                        {...register("stage")}
                        type="radio"
                        name="stage"
                        value="in construction"
                        id="stage_of_project"
                    />
                    in construction
                </label>

                <label htmlFor="stage_of_project">
                    <input
                        {...register("stage")}
                        type="radio"
                        name="stage"
                        value="done"
                        id="stage_of_project"
                    />
                    done
                </label>

                <label htmlFor="upload_files">
                    <input
                        {...register("upload_files")}
                        type="text"
                        name="upload_files"
                        id="upload_files"
                    />
                    Upload files:
                </label>

                <label htmlFor="few_words">
                    <input 
                        {...register("few_words")}
                        type="text"
                        name="few_words"
                        placeholder="Please share a few words about your project..."
                        id="few_words"
                    />
                    
                </label>
            </form>
        </div>
    )
}