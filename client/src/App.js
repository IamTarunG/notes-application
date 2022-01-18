import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import axios from "axios";
export default function App() {
  const [item, setItem] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [isPut, setIsPut] = useState(false);
  const [updatedNotes, setUpdatedNotes] = useState({
    title: "",
    description: "",
    image: "",
    id: "",
  });
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  async function addData(e) {
    e.preventDefault();
    const newNotes = {
      title: item.title,
      description: item.description,
      image: item.image,
    };
    await axios.post("/notes", newNotes);
    setItem({ title: "", description: "" });
  }

  async function getNotes() {
    setLoading(true);
    const response = await fetch("/notes");
    const notesData = await response.json();

    console.log(notesData);
    setNotes(notesData);
    setLoading(false);
  }

  async function deleteNotes(id) {
    await axios.delete("/notes/" + id);
    const deletedNotes = notes.filter((ele) => {
      return ele._id !== id;
    });
    setNotes(deletedNotes);
  }

  function openUpdate(id) {
    setIsPut(true);
    setUpdatedNotes({ ...updatedNotes, id: id });
  }
  async function updateNotes(id) {
    await axios.put("/notes/" + id, updatedNotes);
  }
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.image]);
  return (
    <div>
      <p className="text-center text-3xl font-semibold py-3">Notes✍</p>
      {!isPut ? (
        <form className=" px-96 py-3 drop-shadow-2xl shadow-lg mx-5 mb-5">
          <div className="flex-col justify-evenly items-center space-y-10">
            <div className="flex">
              <input
                type="text"
                onChange={(e) => setItem({ ...item, title: e.target.value })}
                value={item.title}
                placeholder="Title"
                className="px-3 py-2 border-2 border-blue-500  rounded-full font-semibold text-black text-lg hover:border-blue-900 "
              />
            </div>
            <div className="flex">
              <textarea
                rows={10}
                cols={100}
                type="text"
                onChange={(e) =>
                  setItem({ ...item, description: e.target.value })
                }
                value={item.description}
                placeholder="Description"
                className="px-2 py-2 border-2 border-blue-500  rounded-lg text-black text-md hover:border-blue-900"
              />
            </div>
          </div>
          <div className="flex h-40 justify-around items-center">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setItem({ ...item, image: base64 })}
            />
            <button
              onClick={addData}
              className="bg-green-400 px-3 py-1 rounded-md font-semibold active:border-green-600 border-4 "
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <form className=" px-96 py-3 drop-shadow-2xl shadow-lg mx-5 mb-5">
          <div className="flex-col justify-evenly items-center space-y-10">
            <div className="flex">
              <input
                type="text"
                onChange={(e) =>
                  setUpdatedNotes({ ...updatedNotes, title: e.target.value })
                }
                value={updatedNotes.title}
                placeholder="Title"
                className="px-3 py-2 border-2 border-blue-500  rounded-full font-semibold text-black text-lg hover:border-blue-900 "
              />
            </div>
            <div className="flex">
              <textarea
                rows={10}
                cols={100}
                type="text"
                onChange={(e) =>
                  setUpdatedNotes({
                    ...updatedNotes,
                    description: e.target.value,
                  })
                }
                value={updatedNotes.description}
                placeholder="Description"
                className="px-2 py-2 border-2 border-blue-500  rounded-lg text-black text-md hover:border-blue-900"
              />
            </div>
          </div>
          <div className="flex h-40 justify-around items-center">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setUpdatedNotes({ ...updatedNotes, image: base64 })
              }
            />
            <button
              onClick={() => updateNotes(updatedNotes.id)}
              className="bg-blue-400 px-3 py-1 rounded-md font-semibold active:border-blue-600 border-4 "
            >
              Update
            </button>
          </div>
        </form>
      )}

      {notes.length === 0 && (
        <p className=" flex justify-center h-20 items-center text-2xl font-semibold">
          Notes goes here{" "}
        </p>
      )}
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="spinner-grow text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-rows-4 grid-cols-4 mx-20 gap-3">
          {notes.map((ele) => {
            return (
              <div
                className="card my-3 shadow-2xl"
                style={{ width: "18rem" }}
                key={ele._id}
              >
                <img src={ele.image} className="card-img-top" alt={ele.title} />
                <div className="card-body">
                  <h5 className="card-title font-bold text-lg">{ele.title}</h5>
                  <p className="card-text">{ele.description}</p>
                  <div className="flex justify-between mr-10 my-2">
                    <button
                      className="bg-red-500 px-2 py-1 my-2 border-4 border-red-300 font-semibold rounded-md"
                      onClick={() => deleteNotes(ele._id)}
                    >
                      Remove
                    </button>
                    <button
                      className="bg-blue-500 px-2 py-1 my-2 border-4 border-blue-300 font-semibold rounded-md"
                      onClick={() => openUpdate(ele._id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
