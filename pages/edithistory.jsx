import { useEffect, useState } from "react";
import Axios from "axios";
import { withRouter } from "next/router";

const Article = withRouter(props => {
  const [editData, setData] = useState("");
  const [failure, setFailure] = useState("");

  useEffect(() => {
    const id = props.router.query.title;
    if (id) {
      Axios.get(`/api/edit-history?id=${id}`).then(res => {
        const data = res.data;
        if (data) {
          console.log(data);
          return setData(data);
        } else {
          setFailure("No article Found with that id");
        }
      });
    } else {
      location.href = "/";
    }
  }, []);

  return (
    <div style={{overflow:'scroll'}}>
      {!editData && !failure && <div>Loading Edit History ...</div>}

      {editData && (
        <>
        <h2>{props.router.query.title} edit history</h2>

        <table>
          <thead>
            <tr>
              <th style={{minWidth:'150px'}}>Name</th>
              <th style={{minWidth:'150px'}}>Event</th>
              <th style={{minWidth:'150px'}}>Date</th>
            </tr>
          </thead>
          
            <tbody>
            {editData.map(atom => (
              <tr key={atom.date}>
                <td style={{minWidth:'150px'}}>{atom.user}</td>
                <td style={{minWidth:'150px'}}>{atom.event}</td>
                <td style={{minWidth:'150px'}}>{atom.date}</td>
              </tr>
            ))}
            </tbody>
        </table>
        </>
      )}

      {failure && `${failure}`}
    </div>
  );
});

export default Article;
