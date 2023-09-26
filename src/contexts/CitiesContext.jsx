import { createContext, useEffect, useContext, useReducer } from 'react'

const URL = 'http://localhost:8000'
const CitiesContext = createContext()

function reducer(state, action) {
	switch (action.type) {
		case 'loading':
			return { ...state, isLoading: true }
		case 'cities/loaded':
			return { ...state, cities: action.payload }
		case 'currentCity/loaded':
			return { ...state, currentCity: action.payload }
		case 'createCity/loaded':
			return { ...state, cities: [...state.cities, action.payload], currentCity: action.payload }
		case 'deleteCity/loaded':
			return { ...state, cities: action.payload }
		case 'stopLoading':
			return { ...state, isLoading: false }
		case 'rejected':
			return { ...state, error: action.payload, isLoading: false }
		default:
			throw new Error('Unnown actionType')
	}
}

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: '',
}

function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState)

	useEffect(function () {
		async function fetchCities() {
			dispatch({ type: 'loading' })
			try {
				const res = await fetch(`${URL}/cities`)
				const data = await res.json()
				dispatch({ type: 'cities/loaded', payload: data })
			} catch {
				dispatch({ type: 'rejected', payload: 'There was an error loading data...' })
			} finally {
				dispatch({ type: 'stopLoading' })
			}
		}
		fetchCities()
	}, [])

	async function getCity(id) {
		if (+id === currentCity.id) return

		dispatch({ type: 'loading' })
		try {
			const res = await fetch(`${URL}/cities/${id}`)
			const data = await res.json()
			dispatch({ type: 'currentCity/loaded', payload: data })
		} catch {
			dispatch({ type: 'rejected', payload: 'There was an error loading data...' })
		} finally {
			dispatch({ type: 'stopLoading' }) /// to jest niepotrzebne bo już dodaje false podczas pobierania wyzej.
		}
	}
	async function createCity(newCity) {
		dispatch({ type: 'loading' })
		try {
			const res = await fetch(`${URL}/cities`, {
				method: 'POST',
				body: JSON.stringify(newCity),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const data = await res.json()
			dispatch({ type: 'createCity/loaded', payload: data })
		} catch {
			dispatch({ type: 'rejected', payload: 'There was an error creatig city...' })
		} finally {
			dispatch({ type: 'stopLoading' })
		}
	}
	async function deleteCity(id) {
		dispatch({ type: 'loading' })
		try {
			await fetch(`${URL}/cities/${id}`, {
				method: 'DELETE',
			})
			dispatch({ type: 'deleteCity/loaded', payload: cities.filter(city => city.id !== id) })
		} catch {
			dispatch({ type: 'rejected', payload: 'There was an error deleting city...' })
		} finally {
			dispatch({ type: 'stopLoading' })
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
				createCity,
				deleteCity,
				error,
			}}>
			{children}
		</CitiesContext.Provider>
	)
}

function useCities() {
	const contexts = useContext(CitiesContext)
	if (contexts === undefined) throw new Error('City context was used outside Provider')
	return contexts
}

export { CitiesProvider, useCities }
