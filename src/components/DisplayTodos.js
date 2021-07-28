import React, { useState } from "react";
import { connect } from "react-redux";
import { TodoItems } from "./TodoItems";
import { AnimatePresence, motion } from "framer-motion";
import {
	addTodos,
	completeTodos,
	removeTodos,
	updateTodos,
} from "../redux/Reducer";

const mapPropsState = (state) => {
	return {
		todos: state,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addTodo: (obj) => dispatch(addTodos(obj)),
		removeTodo: (obj) => dispatch(removeTodos(obj)),
		updateTodo: (obj) => dispatch(updateTodos(obj)),
		completeTodo: (obj) => dispatch(completeTodos(obj)),
	};
};

const DisplayTodos = (props) => {
	const [sort, setSort] = useState("active");

	return (
		<div className="displaytodos">
			<div className="buttons">
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setSort("active")}
				>
					Active
				</motion.button>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setSort("completed")}
				>
					Completed
				</motion.button>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setSort("all")}
				>
					All
				</motion.button>
			</div>
			<ul>
				<AnimatePresence>
					{props.todos.length > 0 && sort === "active"
						? props.todos.map((item) => {
								return (
									item.completed === false && (
										<TodoItems
											key={item.id}
											item={item}
											removeTodo={props.removeTodo}
											updateTodo={props.updateTodo}
											completeTodo={props.completeTodo}
										/>
									)
								);
						  })
						: null}
					{/* for completed items */}
					{props.todos.length > 0 && sort === "completed"
						? props.todos.map((item) => {
								return (
									item.completed === true && (
										<TodoItems
											key={item.id}
											item={item}
											removeTodo={props.removeTodo}
											updateTodo={props.updateTodo}
											completeTodo={props.completeTodo}
										/>
									)
								);
						  })
						: null}
					{/* for all items */}
					{props.todos.length > 0 && sort === "all"
						? props.todos.map((item) => {
								return (
									<TodoItems
										key={item.id}
										item={item}
										removeTodo={props.removeTodo}
										updateTodo={props.updateTodo}
										completeTodo={props.completeTodo}
									/>
								);
						  })
						: null}
				</AnimatePresence>
			</ul>
		</div>
	);
};

export default connect(mapPropsState, mapDispatchToProps)(DisplayTodos);
