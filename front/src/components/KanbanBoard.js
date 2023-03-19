// components/KanbanBoard.js
import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';

const initialTasks = [
  { id: 1, title: 'Task 1', status: 'Todo' },
  { id: 2, title: 'Task 2', status: 'InProgress' },
  { id: 3, title: 'Task 3', status: 'Done' },
];

const TaskPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle) {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, title: newTaskTitle, status: 'Todo' },
      ]);
      setNewTaskTitle('');
    }
  };

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <TaskPaper key={task.id}>
          <Typography>{task.title}</Typography>
        </TaskPaper>
      ));
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            ToDo
          </Typography>
          {renderTasks('Todo')}
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            In Progress
          </Typography>
          {renderTasks('InProgress')}
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Done
          </Typography>
          {renderTasks('Done')}
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <TextField
          label="New Task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button
          sx={{ mt: 1 }}
          variant="contained"
          color="primary"
          onClick={handleAddTask}
        >
          Add Task
        </Button>
      </Box>
    </Box>
  );
};

export default KanbanBoard;
