import Spinner from './Spinner'
import Message from './Message'
import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import { useCities } from '../contexts/CitiesContext'

function CountriesList() {
	const { cities, isLoading } = useCities()
	if (isLoading) return <Spinner />
	if (!cities.length) return <Message message="Add your first city by clicking a city on the map" />

	//remove duplicate country from array
	const countries = cities.reduce((acc, cur) => {
		if (!acc.map(el => el.country).includes(cur.country)) {
			return [...acc, { country: cur.country, emoji: cur.emoji }]
		} else {
			return acc
		}
	}, [])

	return (
		<ul className={styles.countryList}>
			{countries.map(country => (
				<CountryItem country={country} key={country.country} />
			))}
		</ul>
	)
}

export default CountriesList
