import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {addTodo} from "../store/todoSlice.js";

const TodoForm = () => {
	const [text, setText] = useState('');
	const dispatch = useDispatch();

	const addNewTodo = (e) => {
		e.preventDefault();
		if (!text.trim().length) return;
		dispatch(addTodo({text}));
		setText('');
	}

	return (
		<form onSubmit={addNewTodo} className="addTodo">
			<input type="text" placeholder="Добавить дело" value={text} onChange={e => setText(e.target.value)}/>
			<button type="submit">Добавить</button>
		</form>
	);
};

export default TodoForm;