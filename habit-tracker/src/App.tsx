import { Box, Container, Typography } from '@mui/material'
import AddHabitForm from './components/add-habit-form'
import  HabitList from './components/habit-list'
import useHabitStore from './store/Store';
import { useEffect } from 'react';
import HabitStats from './components/habit-stats';

function App() {
 const {fetchHabits} = useHabitStore();

  useEffect(() => {
    if (fetchHabits){
      fetchHabits();
    }
  }, [fetchHabits]);
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
       <Typography variant="h4" gutterBottom align='center' component='h1'>
        Habit Tracker
       </Typography>
       {/* Form */}
       <AddHabitForm/>
       {/* List of Habits*/}
       <HabitList/>
       {/* Habit stats  */}
       <HabitStats/>
      </Box>
    </Container>
  )
}

export default App
