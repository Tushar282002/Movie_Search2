const { getEmbedding, findSimilarDocuments } = require("../services/embed-functions");

const OPENAI_API_KEY_1 = process.env.OPENAI_API_KEY_1;
const OPENAI_API_KEY_2 = process.env.OPENAI_API_KEY_2;

const semanticSearch = async (req, res) => {
  const query = req.query.query;
  const page = parseInt(req.query.page) || 1;
  const limit = 15;

  if (!query.trim() || page < 1) {
    return res.json({
      message: "Success",
      data: {
        movies: [],
        count: 0,
      },
    });
  }

  try {
    let embedding;
    try {
      // First attempt to get the embedding using the first API key
      embedding = await getEmbedding(query, 1, OPENAI_API_KEY_1);
    } catch (error) {
      console.error("Error with first API key:", error.message);
      try {
        // Retry with the second API key if the first fails
        await new Promise((resolve) => setTimeout(resolve, 3000));
        embedding = await getEmbedding(query, 1, OPENAI_API_KEY_2);
      } catch (error) {
        console.error("Error with second API key:", error.message);
        return res.status(503).json({ error: "External Server Error" });
      }
    }

    // Use the embedding to find similar documents (movies)
    const movies = await findSimilarDocuments(embedding, limit, page);

    res.json({
      message: "Success",
      data: {
        movies: movies,
        count: movies.length,
      },
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = semanticSearch;
