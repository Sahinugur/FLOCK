import React, { useContext, useState } from "react";
import makeCall from "../../api/Call";
import env from "../../api/env";
import { ChatContext } from "../../context/SharedContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import "./ProjectForm.css";

const schema = yup
  .object()
  .shape({
    title: yup.string().required("Please provide title of your project"),
    founder: yup.string().required("Please provide username"),
    size_of_project: yup.string(),
    participants: yup.string(),
    type_of_project: yup.string(),
    technologies: yup.array(),
    stage_of_project: yup.string(),
    add_link: yup.string(),
    few_words: yup.string(),
  })
  .required();

export default function ProjectForm({ reload, setReload }) {
  const { state } = useContext(ChatContext);
  const [modal, setModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onFocus",
  });

  const navigate = useNavigate();

  const toggleModal = () => {
    setModal(!modal);
  };

  async function logProject(logs) {
    console.log("hello logs");
    logs.id = state.user._id;
    await makeCall(env.LOGPROJECT, "POST", logs).then((result) => {
      setReload(!reload);
      navigate(`/projects`);
      toggleModal();
      console.log("result of projectForm", result);
    });
  }

  function handleErrors() {
    console.log(`errors`, errors);
    setErrorMsg("");
  }

  /* Creating a multiselect checkboxes*/
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "go", label: "Go" },
    { value: "php", label: "PHP" },
    { value: "typescript", label: "TypeScript" },
    { value: "c", label: "C" },
    { value: "c++", label: "C++" },
    { value: "semanticUI", label: "SemanticUI" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "sql", label: "SQL" },
    { value: "nodejs", label: "Node.js" },
    { value: "kotlin", label: "Kotlin" },
    { value: "webassembly", label: "WebAssembly" },
    { value: "sass", label: "SASS" },
    { value: "bootstrap", label: "Bootstrap" },
    { value: "reactjs", label: "React" },
  ];

  /*re-styling technologies */
  const customStyles = {
    option: (provided, state) => ({
      borderBottom: "1px solid #gray",
      color: state.isSelected ? "yellow" : "black",
      backgroundColor: state.isSelected ? "green" : "white",
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "#ddd",
      width: "90%",
      height: "10%",
      margin: "0.6rem",
      borderRadius: "5px",
      border: "none",
    }),
  };

  return (
    <>
      <button onClick={toggleModal} className="btn_prModal_cont">
        Create Project
      </button>
      {modal && (
        <div className="prModal">
          <div onClick={toggleModal} className="prOverlay"></div>
          <div className="prModal-content">
            <h2>Log your project</h2>
            <button onClick={toggleModal} className="close-modal">
              Close
            </button>
            <form
              onFocus={handleErrors}
              onSubmit={handleSubmit((data) => logProject(data))}
              className="pr_form">
              <div className="left_side">
                <label htmlFor="title"> Title:</label>
                <input
                  // placeholder="Title:"
                  type="text"
                  id="title"
                  name="projectTitle"
                  {...register("title", {
                    required: "Please provide title of your project",
                  })}
                />
                <p>{errors.title?.message}</p>

                <label htmlFor="founder">Founder:</label>
                <input
                  type="text"
                  id="founder"
                  name="founder"
                  value={state.user.firstName}
                  readOnly
                  /* data={state.user.id} */
                  {...register("founder", {
                    required: "Please provide username",
                  })}
                />
                <p>{errors.password?.message}</p>

                <div className="size_and_stage">
                  {/* <p>Size of project:</p> */}
                  <p>Size of project:</p>
                  <div className="radioBtn">
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
                  </div>
                </div>

                <label htmlFor="type_of_project">Select type of project:</label>
                <select
                  {...register("type_of_project")}
                  defaultValue={"DEFAULT"}
                  name="type_of_project"
                  id="type_of_project">
                  <option value="DEFAULT" disabled>
                    Select type of project...
                  </option>
                  <option value="static_web_apps">Static Web Apps</option>
                  <option value="dynamic_web_apps">Dynamic Web Apps</option>
                  <option value="single_page_apps">Single Page Apps</option>
                  <option value="multiple_page_apps">Multiple Page Apps</option>
                  <option value="animated_web_apps">Animated Web Apps</option>
                  <option value="content_management_system">
                    Content Management System
                  </option>
                  <option value="e_commerce_apps">E-commerce Apps</option>
                  <option value="portal_web_apps">Portal Web Apps</option>
                  <option value="progressive_web_apps">
                    Progressive Web Apps
                  </option>
                </select>

                <Select
                  {...register("technologies")}
                  isMulti
                  styles={customStyles}
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                />
              </div>

              <div className="right_side">
                <label htmlFor="participants">Add participants:</label>
                <input
                  {...register("participants")}
                  type="text"
                  name="participants"
                  id="participants"
                  // placeholder="Add participants"
                />

                <label htmlFor="add_link">Add Link:</label>
                <input
                  {...register("add_link")}
                  // placeholder="Add link"
                  type="text"
                  name="add_link"
                  id="add_link"
                />

                <div className="size_and_stage">
                  <p>Stage of project:</p>
                  <div className="radioBtn">
                    <label htmlFor="stage_first_steps">
                      <input
                        {...register("stage_of_project")}
                        type="radio"
                        name="stage_of_project"
                        value="first_steps"
                        id="stage_first_steps"
                      />
                      First steps
                    </label>

                    <label htmlFor="stage_in_construction">
                      <input
                        {...register("stage_of_project")}
                        type="radio"
                        name="stage_of_project"
                        value="in_construction"
                        id="stage_in_construction"
                      />
                      In construction
                    </label>

                    {/* <label htmlFor="stage_execution">
                                            <input
                                                {...register("stage_of_project")}
                                                type="radio"
                                                name="stage_of_project"
                                                value="execution"
                                                id="stage_execution"
                                            />
                                            Execution
                                        </label> */}

                    <label htmlFor="stage_done">
                      <input
                        {...register("stage_of_project")}
                        type="radio"
                        name="stage_of_project"
                        value="done"
                        id="stage_done"
                      />
                      Done
                    </label>
                  </div>
                </div>

                <label htmlFor="few_words">
                  Please share a few words about your project:
                </label>
                <textarea
                  {...register("few_words")}
                  type="text"
                  name="few_words"
                  // placeholder="Please share a few words about your project..."
                  id="few_words"
                />
              </div>
              <button
                className="create_Btn"
                type="submit"
                value="Create"
                onClick={handleSubmit}>
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
