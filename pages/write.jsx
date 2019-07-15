import { useEffect } from "react";
import axios from "axios";

export default function Write({user}) {
  useEffect(() => {}, []);

  const handleSubmit = e => {
    e.preventDefault();
    const title = document.querySelector("#title").value.trim();
    const description = document.querySelector("#description").value.trim();
    const text = document.querySelector("#article").value.trim();

    const reqData = {
      title,
      description,
      text: text.replace(/\n/g, "<br />"),
      user
    };
    axios
      .post("/api/create-article", reqData)
      .then(res =>  {
        swal("Article Submitted", "", "success");
        location.href="/";
      })
      .catch(err => {
        return swal("Sorry", `Article name not unique`, "error");
      });
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <label htmlFor="title">
        <h5>Title</h5>
      </label>
      <input
        className="browser-default"
        style={{
          height: "100%",
          width: "100%",
          padding: "10px",
          border: "2px #eee solid",
          borderRadius: "8px"
        }}
        required
        id="title"
        type="text"
        placeholder="Give a suitable title ..."
      />
      <label style={{ marginTop: "1em" }} htmlFor="description">
        <h5>Description</h5>
      </label>
      <input
        className="browser-default"
        style={{
          height: "100%",
          width: "100%",
          padding: "10px",
          border: "2px #eee solid",
          borderRadius: "8px"
        }}
        required
        id="description"
        type="text"
        placeholder="Write a suitable description in one or two sentences ..."
      />
      <label style={{ marginTop: "1em" }} htmlFor="article">
        <h5>Article</h5>
      </label>
      <textarea
        rows="10"
        className="browser-default"
        style={{
          height: "100%",
          width: "100%",
          padding: "10px",
          border: "2px #eee solid",
          borderRadius: "8px"
        }}
        required
        id="article"
        placeholder="Write the Article Body ..."
      />
      <button style={{ marginTop: "1em", borderRadius: "8px" }} type="submit">
        Submit
      </button>
    </form>
  );
}
