import React, { useState, useContext } from "react";
import makeCall from "../api/Call";
import env from "../api/env";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
    .object()
    .shape({
        title: yup.string().required("Please provide title of your project"),
        password: yup
            .string()
            .required("No password provided")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
        size_of_project: yup,

        participants: yup.

    })

export default function Project() {
    const {registerProject, handleSubmit} = useForm();
    const [project, setProject] = useState({});


    return (
        <form onSubmit={handleSubmit((data) => setProject({data}))}>
            
        </form>
    )
}