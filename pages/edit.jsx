import { useEffect, useState } from "react";
import Axios from "axios";
import { withRouter } from "next/router";

const Article = withRouter(props => {
  const [failure, setFailure] = useState("");

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    // console.log(props.router.query.id);
    const id = props.router.query.id;
    if (id) {
      Axios.get(`/api/article-data?id=${props.router.query.id}`).then(res => {
        const data = res.data;
        console.log(data[0]);
        if (data[0]) {
          setTimeout(()=>{
            document.querySelector("#article").value = data[0].text
            .replace(/<br \/>/g,'\n');
          }, 500);
          setId(data[0]._id);
          setTitle(data[0].title);
          setDescription(data[0].description);
          setText(data[0].text);
        } else {
          setFailure("No article Found with that id");
        }
      });
    } else {
      location.href = "/";
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const confirmation = confirm("Are you sure you want to edit this article ?");
    if (confirmation) {
      const reqData = {
        id,
        title,
        description,
        user: props.user,
        text: text.replace(/\n/g, "<br />")
      };
      Axios.post("/api/update-article", reqData)
        .then(res => {
          swal("Article Edit", "", "success");
          location.href="/";
        })
        .catch(err => {
          return swal("Sorry", `Article Editing Failed`, "error");
        });
    } else return;
  };

  return (
    <div>
      {!id && !failure && <div>Loading Article ...</div>}

      {id && (
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
            defaultValue={title}
            placeholder="Give a suitable title ..."
            onChange={e=>setTitle(e.target.value.trim())}
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
            defaultValue={description}
            id="description"
            type="text"
            placeholder="Write a suitable description in one or two sentences ..."
            onChange={e=>setDescription(e.target.value.trim())}
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
            onChange={e=>setText(e.target.value.trim())}
          />
          <button style={{ marginTop: "1em", borderRadius: "8px" }} type="submit">
            Submit
          </button>
        </form>
      )}
      {failure && `${failure}`}
    </div>
  );
});

export default Article;
