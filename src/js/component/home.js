import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

Form.propTypes = {
	inputValue: PropTypes.string,
	setInputValue: PropTypes.func,
	setTodos: PropTypes.func,
	todos: PropTypes.array
};

function Form(props) {
	const submitHandler = event => {
		// Prevent form submission on Enter key
		event.preventDefault();
		if (props.inputValue === "") {
			alert("Debe ingresar una tarea");
		} else {
			// props.setTodos(todos => [...props.todos, props.inputValue]);
			// props.setTodos(todos => todos.concat(props.inputValue));
			props.setTodos([
				...props.todos,
				{
					label: props.inputValue,
					id: props.todos.length,
					done: false
				}
			]);
			props.setInputValue("");
			console.log(props.inputValue);
			console.log(props.todos);

			actualizarTodo();
		}
	};

	let fetchUrl =
		"https://assets.breatheco.de/apis/fake/todos/user/chip-student";
	// PUT request using fetch with async/await
	const actualizarTodo = async () => {
		await fetch(fetchUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(props.todos)
		})
			.then(resp => {
				if (resp.ok) {
					alert(
						"¡Las tareas han sido actualizadas satisfactoriamente!"
					);
				}
			})
			.catch(error => {
				//manejo de errores
				console.log(
					"Por favor validar este error inesperado:\n" + error
				);
			});
	};

	return (
		<form onSubmit={submitHandler} className="input-group mb-2">
			<input
				name="item"
				className="form-control"
				type="text"
				value={props.inputValue}
				onChange={e => props.setInputValue(e.target.value)}
			/>
			{/* <button className="btn btn-primary ml-1" onClick={btnAgregar}>
					<i className="fas fa-plus"></i>
				</button> */}
			{/* <button className="btn btn-primary ml-1" onClick={actualizarTodo}>
				<i className="fab fa-superpowers"></i>
			</button> */}
		</form>
	);
}

TodoList.propTypes = {
	todos: PropTypes.array,
	setTodos: PropTypes.func
};

function TodoList(props) {
	function deleteItem(id) {
		const newList = props.todos.filter(element => element.id !== id);
		props.setTodos(newList);
		eliminarTodo();
	}

	let fetchUrl =
		"https://assets.breatheco.de/apis/fake/todos/user/chip-student";
	// PUT request using fetch with async/await
	const eliminarTodo = async () => {
		await fetch(fetchUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(props.todos)
		})
			.then(resp => {
				if (resp.ok) {
					alert(
						"¡Las tareas han sido actualizadas satisfactoriamente al eliminar una tarea!"
					);
				}
			})
			.catch(error => {
				//manejo de errores
				console.log(
					"Por favor validar este error inesperado:\n" + error
				);
			});
	};

	return (
		<ul className="list-group">
			{props.todos.map(todo => (
				<li
					key={todo.id}
					className="form-control d-flex justify-content-between align-items-center">
					{todo.label}
					<button
						onClick={() => deleteItem(todo.id)}
						type="button"
						className="btn btn-light btn-sm float right delete"
						aria-label="Close">
						<i className="fas fa-times"></i>
					</button>
				</li>
			))}
		</ul>
	);
}

//create your first component
export function Home() {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		let fetchUrl =
			"https://assets.breatheco.de/apis/fake/todos/user/chip-student";

		const fetchTodo = async () => {
			let resul = await fetch(fetchUrl)
				.then(res => res.json())
				.then(data => setTodos(data))
				.catch(error => console.error("Error:", error));
			console.log(todos);
		};
		fetchTodo();
	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-8">
					<div className="d-flex justify-content-center">
						<h1>Lista de tareas</h1>
					</div>
					<Form
						todos={todos}
						setTodos={setTodos}
						inputValue={inputValue}
						setInputValue={setInputValue}
					/>
					<TodoList setTodos={setTodos} todos={todos} />
				</div>
			</div>
		</div>
	);
}
