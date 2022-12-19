import React from 'react';
import TodoItem from "./TodoItem.jsx";
import {useSelector} from "react-redux";


const TodoList = () => {
	const todos = useSelector(state => state.todos.todos)

	return (
		<ul>
			{todos && todos.length > 0 && todos.map(todo =>
				<React.Fragment key={todo.id}>
					<TodoItem {...todo} />
				</React.Fragment>
			)}
		</ul>
	);
};

export default TodoList;