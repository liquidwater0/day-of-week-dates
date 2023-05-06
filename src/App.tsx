import { useState } from 'react';
import "./scss/App.scss";
import DateButton from './components/DateButton';

function App() {
	const [dates, setDates] = useState<string[]>([]);
	const [startDate, setStartDate] = useState<Date>(() => {
		const now = new Date();
		return new Date(now.setMonth(now.getMonth() - 1));
	});
	const [endDate, setEndDate] = useState<Date>(new Date());
	const [dayOfWeek, setDayOfWeek] = useState<string>("sunday");

	function getDatesForDayOfWeek() {
		const daysOfWeeks = new Map([["sunday", 0], ["monday", 1], ["tuesday", 2], ["wednesday", 3], ["thursday", 4], ["friday", 5], ["saturday", 6]]);
		const datesArray: string[] = [];
		let date: Date = new Date(startDate);
		
		while (date.getTime() <= endDate.getTime()) {
			if (date.getDay() === daysOfWeeks.get(dayOfWeek)) {
				datesArray.push(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`);
			}

			date = new Date(date.setDate(date.getDate() + 1));
		}

		setDates(datesArray);
	}

	function formatDate(date: Date) {
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		const year = date.getFullYear();

		return `${year}-${month}-${day}`;
	}
	
	return (
		<>
			<header className='header container'>
				Dates on
				<select 
					id='dayOfWeekSelect'
					defaultValue={dayOfWeek}
					onChange={({ target }) => setDayOfWeek(target.value)} 
				>
					<option value="sunday">Sunday</option>
					<option value="monday">Monday</option>
					<option value="tuesday">Tuesday</option>
					<option value="wednesday">Wednesday</option>
					<option value="thursday">Thursday</option>
					<option value="friday">Friday</option>
					<option value="saturday">Saturday</option>
				</select>
			</header>

			<main className='main container'>
				{dates.map(date => 
					<DateButton
						key={date}
						date={date}
					/>
				)}
			</main>

			<footer className='footer container'>
				<div className='input-container'>
					<label htmlFor="startDateInput">From</label>
					<input 
						id='startDateInput'
						type="date"
						defaultValue={formatDate(startDate)}
						onChange={({ target }) => {
							const [year, month, day] = target.value.split("-");
							setStartDate(new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
						}}
					/>
				</div>
				<button 
					className='button'
					onClick={getDatesForDayOfWeek}
				>
					Get Dates
				</button>
				<div className='input-container'>
					<label htmlFor="endDateInput">To</label>
					<input 
						id='endDateInput'
						type="date"
						defaultValue={formatDate(endDate)}
						onChange={({ target }) => {
							const [year, month, day] = target.value.split("-");
							setEndDate(new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
						}}
					/>
				</div>
			</footer>
    	</>
  	);
}

export default App;