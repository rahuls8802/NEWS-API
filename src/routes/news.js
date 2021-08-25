const express = require("express");
const newsRouter = express.Router();
const axios = require("axios");

newsRouter.get("/news", async (req, res) => {
  try {
    const newsAPI = await axios.get(
      `https://newsapi.org/v2/everything?q=apple&from=2021-08-17&to=2021-08-17&sortBy=popularity&apiKey=58cba9dee77544aeb5bb56c3d21b5679`
    );

    res.render("news", { articles: newsAPI.data.articles });
  } catch (error) {}
});

newsRouter.get("/:id", async (req, res) => {
  let articleID = req.params.id;
  try {
    const newsAPI = await axios.get(
      `https://newsapi.org/v2/everything?q=apple&from=2021-08-17&to=2021-08-17&sortBy=popularity&apiKey=58cba9dee77544aeb5bb56c3d21b5679${articleID}`
    );

    res.render("newsSingle", { article: newsAPI.data.articles });
  } catch (error) {}
});

newsRouter.post("", async (req, res) => {
  let search = req.body.search;
  try {
    const newsAPI = await axios.get(
      `http://newsapi.org/v2/everything?q=${search}&apiKey=58cba9dee77544aeb5bb56c3d21b5679`
    );

    res.render("newsSearch", { articles: newsAPI.data.articles });
  } catch (error) {}
});

module.exports = newsRouter;
