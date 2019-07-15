import Card from "react-bootstrap/Card"

export default function Article({ article }) {
  return (
    <Card bg="secondary" text="white" style={{ marginTop: "15px" }}>
      <Card.Body>
        <Card.Title><a href={`/article?id=${article._id}`}>{article.title}</a></Card.Title>
        <Card.Text>{article.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
