const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const myApiKey = "d89d0a2da42a4b34bcf53ed802d28c4f";
const app = express();
const port = 3000;
const url = `https://newsapi.org/v2/`;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const responseEverything = await axios.get(url + "everything", {
    params: {
      q: `keyword`,
      apiKey: myApiKey,
    },
  });

  const responseTopHeadlines = await axios.get(url + "top-headlines/", {
    params: {
      country: "id",
      apiKey: myApiKey,
    },
  });

  const resultEverything = responseEverything.data;
  const resultTopHeadlines = responseTopHeadlines.data;

  function getRandomIndex(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

    // inisialisi random yang value nya 
  const randomResultEverything = getRandomIndex(resultEverything.articles);
  // const randomResultTopHeadlines = getRandomIndex(
  //   resultTopHeadlines.articles
  // );   ==> random topHeadlines
  const randomResultEverything2 = getRandomIndex(resultEverything.articles);

  // variable min n max
  const max =  resultTopHeadlines.articles.length - 5 
  const min =  1

  // variable rumus mathrandom 
  const mathRandom = Math.floor(Math.random() * (max - min + 1)) + min;

  console.log(resultEverything)
  console.log(resultTopHeadlines)

  res.render("index.ejs", {
    contentEverythingNews: randomResultEverything,
    contentEverythingNews2 : randomResultEverything2,
    contentTopHeadlines: resultTopHeadlines.articles,
    mathRandom : mathRandom
  });
});

app.get("/tech-news", async(req ,res) => {
  const responseTopHeadlines = await axios.get(url + "top-headlines/", {
    params: {
      category: "technology",
      country : "us",
      apiKey: myApiKey,
    },
  });

  const result = responseTopHeadlines.data
  console.log(result.articles)

  res.render("bitcoin.ejs", {content : result.articles})
})

app.get("/business-news" ,async (req,res) =>{
  const responseTopHeadlines = await axios.get(url + "top-headlines/", {
    params: {
      category: "business",
      country : "us",
      apiKey: myApiKey,
    },
  });

  const result = responseTopHeadlines.data
  console.log(result.articles)

  res.render("business.ejs", {content : result.articles})
})


app.get("/sport-news" ,async (req,res) =>{
  const responseTopHeadlines = await axios.get(url + "top-headlines/", {
    params: {
      category: "sport",
      country : "id",
      apiKey: myApiKey,
    },
  });

  const result = responseTopHeadlines.data
  console.log(result.articles)

  res.render("sport.ejs", {content : result.articles})
})

app.get("/health-news" ,async (req,res) =>{
  const responseTopHeadlines = await axios.get(url + "top-headlines/", {
    params: {
      category: "health",
      country : "us",
      apiKey: myApiKey,
    },
  });

  const result = responseTopHeadlines.data
  console.log(result.articles)

  res.render("health.ejs", {content : result.articles})
})

app.listen(port, () => {
  try {
    console.log(`your server is run in localhost:${port}`);
  } catch (error) {
    console.log(`your error in : ${error.message}`);
  }
});
