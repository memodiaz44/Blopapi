const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const { GraphQLClient, gql } = require('graphql-request');
require('dotenv').config(); // Import and configure dotenv
 
const API_URL = process.env.MYAPI;
const BEARER_TOKEN = process.env.BEARER_TOKEN;

app.use(cors())

app.use(express.json());

app.post('/api/comments', async (req, res) => {
  const { name, email, comment, slug } = req.body;

  // Set up your GraphQL client with the token
  const graphQLClient = new GraphQLClient(API_URL, {
    headers: {
      authorization: `Bearer ${BEARER_TOKEN}`, // Replace with your token
    },
  });

  const mutation = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }) {
        id
      }
    }
  `;

  try {
    // Use the graphQLClient to send the mutation request
    const result = await graphQLClient.request(mutation, {
      name,
      email,
      comment,
      slug,
    });

    res.status(200).json({ message: 'Comment saved successfully' });
  } catch (error) {
    console.error('GraphQL Error:', error);
    res.status(500).json({ error: 'Failed to save comment' });
  }
});

app.get("/api/comments", (req, res) => {
    return res.json({ message: 'TEST' });
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
