import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchTodos} from "./store/todoSlice.js";
import Spinner from "./components/spinner.jsx";

function App() {

	const {status, error, loading} = useSelector(state => state.todos);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTodos());
	}, [])

	if (status === 'loading') {
		return <h2>Загрузка...</h2>
	}
	if (error) {
		return <h2>Ошибка: {error}</h2>
	}

	return (
		<div className="App">
			<TodoForm/>
			{loading && <Spinner/>}
			<TodoList/>
		</div>
	)
}

export default App
