import React from 'react';
import {useDispatch} from "react-redux";
import {deleteTodo, toggleStatus} from "../store/todoSlice";

const TodoItem = ({id, title, completed}) => {

	const dispatch = useDispatch();
	const handleRemove = (id) => {
		dispatch(deleteTodo(id))
	}
	const handleToggle = (id) => {
		dispatch(toggleStatus(id))
	}

	return (
		<li>
			<input type="checkbox" value={completed} checked={completed} onChange={() => handleToggle(id)}/>
			<span className="title">{title}</span>
			<span onClick={() => handleRemove(id)} className="delete">&times;</span>
		</li>
	);
};

export default TodoItem;