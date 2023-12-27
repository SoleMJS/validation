// src/App.js
import React, { useState } from 'react'
import './App.css'

export const App = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	})

	const [errors, setErrors] = useState({})
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)

	const handleInputChange = e => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const validateForm = () => {
		const newErrors = {}
		const { email, password, confirmPassword } = formData

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			newErrors.email = 'Некорректный email'
		}

		if (password.length < 6) {
			newErrors.password = 'Пароль должен содержать не менее 6 символов'
		}

		if (password !== confirmPassword) {
			newErrors.confirmPassword = 'Пароли не совпадают'
		}

		setErrors(newErrors)
		setIsButtonDisabled(Object.keys(newErrors).length > 0)
	}

	const handleSubmit = e => {
		e.preventDefault()
		console.log('Форма отправлена:', formData)
	}

	return (
		<div className='registration-container'>
			<form className='registration-form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<label>Email:</label>
					<input
						type='email'
						name='email'
						value={formData.email}
						onChange={handleInputChange}
						onBlur={validateForm}
					/>
					{errors.email && (
						<span className='error-message'>{errors.email}</span>
					)}
				</div>
				<div className='form-group'>
					<label>Пароль:</label>
					<input
						type='password'
						name='password'
						value={formData.password}
						onChange={handleInputChange}
						onBlur={validateForm}
					/>
					{errors.password && (
						<span className='error-message'>{errors.password}</span>
					)}
				</div>
				<div className='form-group'>
					<label>Повторите пароль:</label>
					<input
						type='password'
						name='confirmPassword'
						value={formData.confirmPassword}
						onChange={handleInputChange}
						onBlur={validateForm}
					/>
					{errors.confirmPassword && (
						<span className='error-message'>{errors.confirmPassword}</span>
					)}
				</div>
				<button type='submit' disabled={isButtonDisabled} autoFocus>
					Зарегистрироваться
				</button>
			</form>
		</div>
	)
}
