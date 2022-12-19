import React from 'react';
import {useDispatch} from "react-redux";
import {removeTodo, toggleTodo} from "../store/todoSlice";

const TodoItem = ({id, text, completed}) => {

	const dispatch = useDispatch();
	const handleRemove = (id) => {
		dispatch(removeTodo({id}))
	}
	const handleToggle = (id) => {
		dispatch(toggleTodo({id}))
	}

	return (
		<li>
			<input type="checkbox" value={completed} checked={completed} onChange={() => handleToggle(id)}/>
			<span className="title">{text}</span>
			<span onClick={() => handleRemove(id)} className="delete">&times;</span>
		</li>
	);
};

export default TodoItem;