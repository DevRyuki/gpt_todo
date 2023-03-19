// pages/index.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import KanbanBoard from '../components/KanbanBoard';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ToDo Kanban Board
        </Typography>
        <KanbanBoard />
      </Box>
    </Container>
  );
};

export default Home;
