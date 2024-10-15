const Movie = require("../models/movie");
const { getEmbedding, findSimilarDocuments } = require("./embed-functions");

const OPENAI_API_KEY_1 = process.env.OPENAI_API_KEY_1;
const OPENAI_API_KEY_2 = process.env.OPENAI_API_KEY_2;

const searchOnEnter = async (req, res) => {
  try {
    let { query, page = 1, flag = 0 } = req.query;
    const pageSize = 25;
    page = parseInt(page);
    flag = parseInt(flag);
    query = query.replace(/\s+/g, " ").trim();

    if (!query || page < 1 || flag < 0 || flag > 1) {
      return res.json({
        message: "Success",
        data: {
          movies: [],
          count: 0,
        },
      });
    }

    let movies = [];

    // Flag determines if regex (flag = 0) or semantic (flag = 1) search should be done
    if (flag === 0) {
      // Regex-based search
      const queryForRegex = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const skip = (page - 1) * pageSize;
      movies = await Movie.find(
        { title: { $regex: "^" + queryForRegex, $options: "i" } },
        { title: 1, _id: 1, poster: 1 }
      )
        .skip(skip)
        .limit(pageSize);

    } else if (flag === 1) {
      // Embedding-based semantic search
      let embedding;
      try {
        embedding = await getEmbedding(query, 1, OPENAI_API_KEY_1);
      } catch (error) {
        console.error("Error with first API key:", error.message);
        try {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          embedding = await getEmbedding(query, 1, OPENAI_API_KEY_2);
        } catch (error) {
          console.error("Error with second API key:", error.message);
          throw error;
        }
      }
      movies = await findSimilarDocuments(embedding, pageSize, page);
    }

    res.json({
      message: "Success",
      data: {
        movies: movies,
        count: movies.length,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = searchOnEnter;
