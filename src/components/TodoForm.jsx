import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {addNewTodo} from "../store/todoSlice.js";

const TodoForm = () => {
	const [text, setText] = useState('');
	const dispatch = useDispatch();

	const addTodo = (e) => {
		e.preventDefault();
		if (!text.trim().length) return;
		dispatch(addNewTodo(text));
		setText('');
	}

	return (
		<form onSubmit={addTodo} className="addTodo">
			<input type="text" placeholder="Добавить дело" value={text} onChange={e => setText(e.target.value)}/>
			<button type="submit">Добавить</button>
		</form>
	);
};

export default TodoForm;