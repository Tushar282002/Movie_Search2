# Movie Search App

## Project Description

The **Movie Search App** is a full-stack web application that offers two primary movie search functionalities:
1. **Title-Based Search**: Allows users to search for movies by their titles using both exact match and fuzzy search methods.
2. **Semantic Search**: Powered by OpenAI's Large Language Models (LLMs), this feature enables users to search for movies using natural language queries, returning semantically similar movie results.

### Features
- **Title-Based Search**:
  - Supports both regex-based and fuzzy search methods.
  - Pagination for navigating through results.
  
- **Semantic Movie Search**:
  - Uses embeddings from OpenAI to match natural language queries with relevant movies.
  - Backup API key for error handling and continuity of search functionality.

- **Efficient Pagination**: Pagination support is implemented for smooth navigation across large result sets.

### Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Embedding Service**: OpenAI API for embeddings
- **Search Engine**: MongoDB full-text search and autocomplete indexes
- **Frontend**: (To be added if a frontend exists)

---

## Setup and Installation

### Prerequisites

To run this project, ensure you have the following installed:
- **Node.js** (version 14.x or higher)
- **npm** (Node Package Manager)
- **MongoDB Atlas Account** for the database
- **OpenAI API Key** for the semantic search functionality

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Tushar282002/Movie_Search2.git
cd Movie_Search2
```

### Install Dependencies

Navigate to the project directory and install all dependencies:

```bash
npm install
```
### Set Up Environment Variables
Create a .env file in the backend/ directory and add the following environment variables:

```bash
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-address>/<database>?retryWrites=true&w=majority
OPENAI_API_KEY_1=your-first-openai-api-key
OPENAI_API_KEY_2=your-second-openai-api-key
```

### Replace the placeholders:

Replace the placeholders:

- `<username>`: Your MongoDB Atlas username.
- `<password>`: Your MongoDB Atlas password.
- `<cluster-address>`: Your MongoDB Atlas cluster address.
- `<database>`: The name of your MongoDB database.
- `your-first-openai-api-key`: Your first OpenAI API key.
- `your-second-openai-api-key`: Your second OpenAI API key (used as a backup).

### Run the Application
After setting up the environment variables, you can run the backend server with the following command:
```bash
npm start
```
This will start the application on `http://localhost:5000`.

## Endpoints

The app exposes the following endpoints:

### Title-Based Search (Regex/Fuzzy search)

- **URL**: `/api/search`
- **Method**: `GET`
- **Query Parameters**:
  - `query`: The movie title to search.
  - `page`: The page number for pagination (default: 1).
  - `flag`: Determines the search method (`0` for regex, `1` for fuzzy search).

### Semantic Search

- **URL**: `/api/semantic-search`
- **Method**: `GET`
- **Query Parameters**:
  - `query`: The natural language query for searching movies.
  - `page`: The page number for pagination (default: 1).

## Testing

To test the API, you can use tools like Postman or cURL to send requests to the endpoints.

### Example Request for Title-Based Search:

```bash
curl "http://localhost:5000/api/search?query=Inception&page=1&flag=1"
```
### Example Request for Semantic Search:
```bash
curl "http://localhost:5000/api/semantic-search?query=action%20movies&page=1"
```


