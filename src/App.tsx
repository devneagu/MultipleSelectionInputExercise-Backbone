import { useReducer, useRef, useState } from "react";
import "./styles.css";

const updateReducer = (state, action) => {
  switch (action.type) {
    case "add":
      const idx = state.notes.findIndex((el) => el === action.value);
      if (idx !== -1) return state;

      state.notes.push(action.value);
      return {
        ...state
      };
    default:
      return state;
  }
};

function SelectNotes(props) {
  const [note, setNote] = useState("");
  const [activeNotes, setActiveNotes] = useState([]);
  const activateEdit = () => {};
  const noteChange = (e) => {
    e.preventDefault();
    setNote(e.target.value);
  };

  const addThisNote = (e) => {
    if (e === undefined || e.key === "Enter") {
      props.dispatch({ type: "add", value: note });

      if (activeNotes.findIndex((el) => el === note) === -1) {
        setActiveNotes([...activeNotes, note]);
      }
      setNote("");
    }
  };

  const updateActiveNotes = (field) => {
    const idx = activeNotes.findIndex((el) => el === field);
    console.log(idx);
    if (idx === -1) {
      //add element
      setActiveNotes([...activeNotes, field]);
    } else {
      //remove element;
      const left = activeNotes.slice(0, idx);
      const right = activeNotes.slice(idx + 1);
      setActiveNotes([...left, ...right]);
    }
  };

  return (
    <div onClick={activateEdit}>
      <div style={{ textAlign: "left", width: "80%", margin: "0 auto" }}>
        <div
          className="containerNotesOption"
          onClick={() => document.getElementsByName("note")[0].focus()}
        >
          {activeNotes.map((item) => (
            <span className="pill">
              {item} <span onClick={() => updateActiveNotes(item)}>x</span>
            </span>
          ))}
          <input
            className="inputNotes"
            type="text"
            value={note}
            onChange={noteChange}
            onKeyPress={addThisNote}
            name="note"
          />
        </div>
        <div id="editMode" style={{ background: "gray" }}>
          <p>Select an option or create one</p>
          {props.data.notes.map((item) => (
            <span
              className="pill"
              key={item}
              onClick={() => updateActiveNotes(item)}
            >
              {item}
            </span>
          ))}
          {note !== "" && (
            <>
              <p>Create</p>
              <span className="pill" onClick={() => addThisNote()}>
                {note}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TableRow(props) {
  return (
    <tr>
      <td>
        <SelectNotes data={props.data} dispatch={props.dispatch} />
      </td>
      <td>
        <input type="text" placeholder="Enter time here" />
      </td>
    </tr>
  );
}
function Table(props) {
  return (
    <table style={{ width: "100%", textAlign: "center" }}>
      <thead>
        <tr>
          <th>Activity</th>
          <th>Time Spent</th>
        </tr>
      </thead>
      <tbody>
        <TableRow data={props.data} dispatch={props.dispatch} />
      </tbody>
    </table>
  );
}

function AddNotes(props) {
  return (
    <div>
      <label>Add Notes</label>
      <Table data={props.data} dispatch={props.dispatch}></Table>
    </div>
  );
}
function Tracker() {
  const [data, dispatch] = useReducer(updateReducer, { notes: ["Matematica"] });

  return (
    <>
      <AddNotes data={data} dispatch={dispatch} />
      <pre>{JSON.stringify(data)}</pre>
    </>
  );
}

export default function App() {
  return <Tracker />;
}
