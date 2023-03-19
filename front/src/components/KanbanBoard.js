// components/KanbanBoard.js
import React, { useState } from 'react';
import { Grid, Typography, Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { styled } from '@mui/system';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const initialTasks = [
  { id: 1, title: 'Task 1', description: 'Task 1 description', status: 'Todo' },
  { id: 2, title: 'Task 2', description: 'Task 2 description', status: 'InProgress' },
  { id: 3, title: 'Task 3', description: 'Task 3 description', status: 'Done' },
];

const TaskPaper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
}));

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = () => {
    if (newTaskTitle) {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, title: newTaskTitle, description: '', status: 'Todo' },
      ]);
      setNewTaskTitle('');
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const reorderedTasks = Array.from(tasks);
      const [removed] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, removed);
      setTasks(reorderedTasks);
    } else {
      const newStatus = destination.droppableId;
      const updatedTasks = tasks.map((task, index) => {
        if (index === source.index) {
          return { ...task, status: newStatus };
        }
        return task;
      });
      setTasks(updatedTasks);
    }
  };

  const handleClose = () => {
    setSelectedTask(null);
  };

  const renderTasks = (status, provided) => {
    return (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {tasks
          .filter((task) => task.status === status)
          .map((task, index) => (
            <Draggable key={task.id} draggableId={String(task.id)} index={index}>
              {(provided) => (
                <TaskPaper
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...provided.draggableProps.style }}
                >
                  <Typography>{task.title}</Typography>
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTask(task);
                    }}
                  >
                    <InfoOutlinedIcon />
                  </IconButton>
                </TaskPaper>
              )}
            </Draggable>
          ))}
        {provided.placeholder}
      </div>
    );
  };

  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          {['Todo', 'InProgress', 'Done'].map((status) => (
            <Grid item xs={12} md={4} key={status}>
              <Typography variant="h6" gutterBottom>
                {status}
              </Typography>
              <Droppable droppableId={status}>
                {(provided) => renderTasks(status, provided)}
              </Droppable>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
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
      {selectedTask && (
        <Dialog open onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography>{selectedTask.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {selectedTask.status}
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography>{selectedTask.description}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default KanbanBoard;

