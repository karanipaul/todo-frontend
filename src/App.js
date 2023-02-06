import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [title, setTitle] = useState('');
	const [flag, setFlag] = useState(false);

	const createTodo = async (title) => {
		await api.post('/api/todo', { title });
		setTitle('');
		setFlag(!flag);
	};

	const editTodo = async (id, data) => {
		await api.patch(`/api/todo/${id}`, data);
		setFlag(!flag);
	};

	const deleteTodo = async (id) => {
		await api.delete(`/api/todo/${id}`);
		setFlag(!flag);
	};

	useEffect(() => {
		(async () => {
			try {
				const res = await api.get('/api/todo');
				setTodos(res.data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [flag]);

	return (
		<div className='w-full h-full bg-gray-200 p-10'>
			<div className='flex items-center justify-center'>
				<div className='w-full sm:w-1/2 space-y-2'>
					<div className='space-y-6 p-5 bg-white rounded-lg shadow-md'>
						<h1 className='text-3xl font-medium text-gray-700 text-center'>
							Todo App
						</h1>
						<hr className='border-0 border-t-2 border-t-gray-400 w-full' />

						<ul className='text-gray-700 space-y-3'>
							{todos.map((todo, idx) => (
								<li
									key={idx}
									className={`flex justify-between items-center p-3 shadow-md rounded-md ${
										todo.done ? 'bg-gray-200' : ''
									}`}
								>
									<p className={todo.done ? 'line-through' : ''}>
										{todo.title}
									</p>
									<div className='flex items-center space-x-2'>
										<input
											className='h-7 w-7 rounded-full'
											type='checkbox'
											name='done'
											onChange={(e) =>
												editTodo(todo._id, { done: e.target.checked })
											}
											defaultChecked={todo.done}
										/>
										<button
											className='px-2 py-1 bg-red-500 hover:bg-red-600 rounded-md text-white'
											onClick={() => deleteTodo(todo._id)}
										>
											<i className='fa-solid fa-trash'></i>
										</button>
									</div>
								</li>
							))}
						</ul>
					</div>
					<div className='space-y-2 p-4 bg-white rounded-lg shadow-md'>
						<input
							className='h-10 text-lg w-full px-3 border-2 border-gray-400 rounded-md focus:outline-none text-gray-700'
							type='text'
							placeholder='Enter todo title...'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<button
							className='w-full p-2 bg-green-500 hover:bg-green-600 rounded-md shadow-md text-white text-2xl font-bold'
							onClick={() => createTodo(title)}
						>
							Add
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
