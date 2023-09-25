import { createContext, useState, useEffect, useContext } from 'react'

const URL = 'http://localhost:8000'
const CitiesContext = createContext()

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [currentCity, setCurrentCity] = useState({})

	useEffect(function () {
		async function fetchCities() {
			try {
				setIsLoading(true)
				const res = await fetch(`${URL}/cities`)
				const data = await res.json()
				setCities(data)
			} catch {
				alert('There was an error loading data...')
			} finally {
				setIsLoading(false)
			}
		}
		fetchCities()
	}, [])

	async function getCity(id) {
		try {
			setIsLoading(true)
			const res = await fetch(`${URL}/cities/${id}`)
			const data = await res.json()
			setCurrentCity(data)
		} catch {
			alert('There was an error loading data...')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
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