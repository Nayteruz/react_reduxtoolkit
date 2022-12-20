import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export const fetchTodos = createAsyncThunk(
	'todos/fetchTodos',
	async function (_, {rejectWithValue}) {
		try {
			const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

			if (!response.ok){
				throw new Error('Some error')
			}

			return await response.json();
		} catch (err){
			return rejectWithValue(err.message)
		}

	}
)

export const deleteTodo = createAsyncThunk(
	'todos/deleteTodo',
	async function(id, {rejectWithValue, dispatch}){
		try {
			const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
				method: 'DELETE'
			})

			if (!response.ok){
				throw new Error('Error delete!')
			}

			dispatch(removeTodo({id}))

		} catch (err) {
			return rejectWithValue(err.message)
		}
	}
)

export const toggleStatus = createAsyncThunk(
	'todo/toggleStatus',
	async function(id, {rejectWithValue, dispatch,getState}) {

		const todo = getState().todos.todos.find(todo => todo.id === id)

		try {
			const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify({
					completed: !todo.completed
				})
			})

			if (!response.ok){
				throw new Error('Error toggle todo!')
			}

			dispatch(toggleTodo({id}))

		} catch (err) {
			return rejectWithValue(err.message)
		}
	}
)

export const addNewTodo = createAsyncThunk(
	'todo/addNewTodo',
	async function(text, {rejectWithValue, dispatch}) {

		try {
			const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
				method: 'POST',
				headers: {
					'Content-Type' : 'application/json',
				},
				body : JSON.stringify({
					title: text,
					completed: false,
					userId: 1,
				})
			})

			if (!response.ok){
				throw new Error('Error add new todo!')
			}

			const data = await response.json();
			dispatch(addTodo({...data, id: Date.now()}))

		} catch (err) {
			return rejectWithValue(err.message)
		}
	}
)

const setError = (state, action) => {
	state.status = 'rejected';
	state.error = action.payload;
	state.loading = false;
}


const todoSlice = createSlice({
	name: 'todos',
	initialState: {
		todos: [],
		status: null,
		error: null,
		loading: false,
	},
	reducers: {
		addTodo(state, action) {
			state.todos.push(action.payload)
		},
		removeTodo(state, action) {
			state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
		},
		toggleTodo(state, action) {
			const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
			toggledTodo.completed = !toggledTodo.completed;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.status = 'fulfilled';
				state.todos = action.payload;
			})
			.addCase(fetchTodos.rejected, setError)
		builder
			.addCase(deleteTodo.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteTodo.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(deleteTodo.rejected, setError)
		builder
			.addCase(toggleStatus.pending, (state) => {
				state.loading = true;
			})
			.addCase(toggleStatus.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(toggleStatus.rejected, setError)
		builder
			.addCase(addNewTodo.pending, (state) => {
				state.loading = true;
			})
			.addCase(addNewTodo.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(addNewTodo.rejected, setError)
	}
})

const {addTodo, removeTodo, toggleTodo} = todoSlice.actions;

export default todoSlice.reducer;