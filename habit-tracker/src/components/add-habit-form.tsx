import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import useHabitStore from "../store/Store";

const AddHabitForm = () => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState<"Daily" | "Weekly">(
    "Daily"
  );

const { habits, addHabit } = useHabitStore();

console.log("Current Habits:", habits);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    if (name.trim() ) { // Ensure name is not empty
      addHabit(name, frequency);
      setName("");
    }
  }

  return (
    <form onSubmit={handleSubmit} >
      <Box sx ={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
        <TextField
          label="Habit Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={frequency}
            label="Frequency"
            onChange={(e) =>
              setFrequency(e.target.value as "Daily" | "Weekly" )
            }
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Add Habit
        </Button>
      </Box>
    </form>
  );
};

export default AddHabitForm;
