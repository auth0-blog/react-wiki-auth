import { useEffect, useState } from "react";
import Axios from "axios";
import { withRouter } from "next/router";

const Article = withRouter(props => {
  const [article, setArticle] = useState("");
  const [failure, setFailure] = useState("");

  useEffect(() => {
    // console.log(props.router.query.id);
    const id = props.router.query.id;
    if (id) {
      Axios.get(`/api/article-data?id=${props.router.query.id}`).then(res => {
        const data = res.data;
        console.log(data[0]);
        if (data[0]) {
          return setArticle(data[0]);
        } else {
          setFailure("No article Found with that id");
        }
      });
    } else {
      location.href = "/";
    }
  }, []);
  return (
    <div>
      {!article && !failure && <div>Loading Article ...</div>}

      {article && (
        <div
          className="valign-wrapper"
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: "-1em",
            justifyContent: "space-between"
          }}
        >
          <h1>{article.title}</h1>
          <div>
            <a href={`/edit?id=${article._id}`} style={{ marginTop: "1em", marginRight: "0.5em" }}>
              Edit This Article
            </a>
            <a href={`/edithistory?title=${article.title}`} style={{ marginTop: "1em" }}>
              Edit History
            </a>
          </div>
        </div>
      )}

      {article && (
        <div style={{ marginTop: "1em" }}>
          {article.text.split("<br />").map(text => (
            <p>{text}</p>
          ))}
        </div>
      )}
      {failure && `${failure}`}
    </div>
  );
});

export default Article;
