import React, { useState } from "react";
import "./Modal.css";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/events";

export const ModalPopUp = () => {
  const [modal, setModal] = useState(false);
  const [postEvent, setPostEvent] = useState({
    creator: "",
    title: "",
    description: "",
    category: "",
  });

  const dispatch = useDispatch();

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ postEvent });
    dispatch(createPost(postEvent));

    toggleModal();
  };

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Create Event
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Add New Event</h2>
            <form onSubmit={handleSubmit}>
              <label>Event Creator</label>
              <input
                type="text"
                value={postEvent.creator}
                onChange={(e) =>
                  setPostEvent({ ...postEvent, creator: e.target.value })
                }
                required
              />

              <label>Event Title</label>
              <input
                type="text"
                value={postEvent.title}
                onChange={(e) =>
                  setPostEvent({ ...postEvent, title: e.target.value })
                }
                required
              />

              <label>Event Description</label>
              <textarea
                value={postEvent.description}
                onChange={(e) =>
                  setPostEvent({ ...postEvent, description: e.target.value })
                }
                required
              ></textarea>

              <label>Select Category</label>
              <select
                value={postEvent.category}
                onChange={(e) =>
                  setPostEvent({ ...postEvent, category: e.target.value })
                }
              >
                <option value="DevOps">DevOps</option>
                <option value="UI-UX Design">UI-UX Design</option>
                <option value="Database">Database</option>
              </select>
              <button onSubmit={handleSubmit}>Submit</button>
            </form>
            <button onClick={toggleModal} className="close-modal">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
