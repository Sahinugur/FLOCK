import React, { useState } from "react";
import "./Modal.css";
import axios from "axios";
// import Datepicker from "react-datepicker";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";

export const ModalPopUp = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  console.log(selectedDate);

  const createEvents = async (postEvent) =>
    axios.post("http://localhost:5001/events", postEvent);

  const [modal, setModal] = useState(false);
  const [postEvent, setPostEvent] = useState({
    creator: "",
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
  });

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ postEvent });
    setPostEvent(createEvents(postEvent));
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
            <h2 className="header">Add New Event</h2>
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
                required></textarea>

              <label>Event Date</label>

              <input
                type="date"
                value={postEvent.date}
                onChange={(e) =>
                  setPostEvent({ ...postEvent, date: e.target.value })
                }
              />
              <label>Event Time</label>
              <input
                type="time"
                value={postEvent.time}
                onChange={(e) =>
                  setPostEvent({ ...postEvent, time: e.target.value })
                }
                required
              />

              <label>Select Category</label>
              <select
                value={postEvent.category}
                onChange={(e) =>
                  setPostEvent({ ...postEvent, category: e.target.value })
                }>
                <option value="DevOps">DevOps</option>
                <option value="UI-UX Design">UI-UX Design</option>
                <option value="Database">Database</option>
              </select>
              <button onSubmit={handleSubmit} className="submitEvent">
                Submit
              </button>
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
