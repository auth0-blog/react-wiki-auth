import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";

const axios = require("axios");

import Articles from "../components/Articles";

function Index() {
  const [articles, setArticles] = useState("");

  useEffect(() => {
    axios.get("/api/articles").then(res => setArticles(res.data));
  }, []);
  return (
    <Container>
      <Articles articles={articles} />
    </Container>
  );
}

export default Index;
