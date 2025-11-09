import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

// Define the structure of the habit store
export interface Habit{
    id : string
    name : string
    frequency : 'Daily' | 'Weekly' ;
    completedDates : string[]
    createdAt : string
}

// Define the state interface for the habit store
interface HabitState {
    habits  : Habit[]; // Array to hold habit objects
    addHabit: (name : string, frequency : 'Daily' | 'Weekly') => void; // Function to add a new habit
    removeHabit: (id : string) => void; // Function to remove a habit by id
    toggleHabit: (id : string, date : string) => void; // Function to toggle completion status for a habit on a specific date
    fetchHabits?: () => Promise<void>; 
    isLoading?: boolean;
    error ?: string  | null;
}

// Create a Zustand store for habit tracking | set and get are used to update and retrieve state 
const useHabitStore = create<HabitState>()(devtools(
    persist((set) => {
return {
    habits : [],
    isLoading: false,
    error: null,
    // Function to add a new habit to the store
    // name and frequency are passed as parameters and set function updates the habits array
    addHabit: (name, frequency) => set((state) => {
        return {
            habits: [...state.habits, { //state.habits spreads existing habits and adds a new habit object
                id: Date.now().toString(), 
                name,
                frequency,
                completedDates: [],
                createdAt: new Date().toISOString(),
            }],
        };
    }),
    // Function to remove a habit from the store by its id
    removeHabit: (id) => set((state) => ({
        habits: state.habits.filter(habit => habit.id !== id), //filters out the habit with the matching id
    })),
    // Function to toggle the completion status of a habit for a specific date
    toggleHabit: (id, date) => set((state) => ({
        habits: state.habits.map(habit => {
            if (habit.id === id) {
                const isCompleted = habit.completedDates.includes(date);
                return {
                    ...habit,
                    completedDates: isCompleted 
                        ? habit.completedDates.filter(d => d !== date) //remove date if already completed
                        : [...habit.completedDates, date], //add date if not completed
                };
            }
            return habit;
        }),
    })),
    fetchHabits: async () => {
    set ({ isLoading: true, error: null , });
    try {
        const currentHabits = useHabitStore.getState().habits;
        if (currentHabits.length > 0){
            set ({ isLoading: false });
            return;
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
        set ({ isLoading: false });
        const mockedHabits: Habit[] = [
            {
                id: '1',
                name: 'Morning Jog',
                frequency: 'Daily',
                completedDates: ['2023-10-01', '2023-10-02'],
                createdAt: '2023-09-30T10:00:00Z',
            },
            {
                id: '2',
                name: 'Read a Book',
                frequency: 'Weekly',
                completedDates: ['2023-09-25'],
                createdAt: '2023-09-20T12:00:00Z',
            },
            {
                id: '3',
                name: 'Meditation',
                frequency: 'Daily',
                completedDates: ['2023-10-01', '2023-10-03'],
                createdAt: '2023-09-28T08:30:00Z',
            },
            {
                id: '4',
                name: 'Practice Flute',
                frequency: 'Weekly',
                completedDates: ['2023-09-26', '2023-10-02'],
                createdAt: '2023-09-22T14:15:00Z',
            }
            
        ];
        set ({ habits: mockedHabits });
    }
    catch (error) {
        set ({ isLoading: false, error: 'Failed to fetch habits' });
    }
},
};
}, { name: 'habits-local' , storage: createJSONStorage(() => sessionStorage)})
));

export default useHabitStore;