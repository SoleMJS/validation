import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import './App.css'

const schema = yup.object().shape({
	email: yup.string().email('Некорректный email').required('Обязательное поле'),
	password: yup
		.string()
		.min(6, 'Пароль должен содержать не менее 6 символов')
		.required('Обязательное поле'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
		.required('Обязательное поле'),
})

export const App = () => {
	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(schema),
	})

	const onSubmit = data => {
		console.log('Форма отправлена:', data)
	}

	return (
		<div className='registration-container'>
			<form className='registration-form' onSubmit={handleSubmit(onSubmit)}>
				<div className='form-group'>
					<label>Email:</label>
					<input {...register('email')} />
					{formState.errors.email && (
						<span className='error-message'>
							{formState.errors.email.message}
						</span>
					)}
				</div>
				<div className='form-group'>
					<label>Пароль:</label>
					<input type='password' {...register('password')} />
					{formState.errors.password && (
						<span className='error-message'>
							{formState.errors.password.message}
						</span>
					)}
				</div>
				<div className='form-group'>
					<label>Повторите пароль:</label>
					<input type='password' {...register('confirmPassword')} />
					{formState.errors.confirmPassword && (
						<span className='error-message'>
							{formState.errors.confirmPassword.message}
						</span>
					)}
				</div>
				<button type='submit' disabled={formState.isSubmitting} autoFocus>
					Зарегистрироваться
				</button>
			</form>
		</div>
	)
}
