module.exports = (app, mongoose) => {
  const { Schema } = mongoose;

  const articleSchema = new Schema({
    title: String,
    description: String,
    text: String
  });

  const editSchema = new Schema({
    title: String,
    user: String,
    date: { type: Date, default: Date.now },
    event: String
  });

  app.get("/api/articles", (req, res) => {
    const Article = mongoose.model("Articles", articleSchema);
    Article.find({}, (err, articles) => {
      res.send(articles);
      console.log(err);
    });
  });

  app.post("/api/create-article", (req, res) => {
    const Article = mongoose.model("Articles", articleSchema);
    const Edit = mongoose.model("Edit", editSchema);

    const { title, description, text, user } = req.body;
    console.log(req.body);
    Article.find({ title }, (err, article) => {
      if (err) {
        return console.log(err);
      } else {
        console.log(article);
        if (article.length === 0) {
          console.log("Adding");

          const newArticle = new Article({
            title,
            description,
            text
          });

          const edit = new Edit({
            title,
            user: user.displayName,
            event: "Creation"
          });

          newArticle.save(err => {
            if (err) return console.log(err);
            res.send("Added");
          });
          edit.save(err => {
            if (err) return console.log(err);
          });
        } else {
          res.sendStatus(403);
        }
      }
    });
  });

  app.post("/api/update-article", (req, res) => {
    const Article = mongoose.model("Articles", articleSchema);
    const Edit = mongoose.model("Edit", editSchema);

    const { id, title, description, text, user } = req.body;
    console.log(req.body);
    Article.findOneAndUpdate({ _id: id }, { title, description, text }, (err, article) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        const edit = new Edit({
          title,
          user: user.displayName,
          event: "Edited"
        });
        edit.save(err => {
          if (err) return console.log(err);
        });
        res.send("Added");
      }
    });
  });

  app.get("/api/article-data", (req, res) => {
    const Article = mongoose.model("Articles", articleSchema);
    const { id } = req.query;
    Article.find({ _id: id }, (err, article) => {
      if (err) return res.send({ success: false });
      res.send({
        success: true,
        ...article
      });
    });
  });

  app.get("/api/edit-history", (req, res) => {
    const Edit = mongoose.model("Edit", editSchema);
    const { id } = req.query;
    Edit.find({ title: id }, (err, article) => {
      if (err) return res.send('');
      res.send(article);
    });
  });
};
