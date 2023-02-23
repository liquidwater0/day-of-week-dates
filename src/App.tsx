import { useState } from 'react';
import "./scss/App.scss";

function App() {
	const [dates, setDates] = useState<string[]>([]);
	const [startDate, setStartDate] = useState<Date>(() => {
		const now = new Date();
		return new Date(now.setMonth(now.getMonth() - 1));
	});
	const [endDate, setEndDate] = useState<Date>(new Date());
	const [dayOfWeek, setDayOfWeek] = useState<string>("sunday");
	const [displayedDayOfWeek, setDisplayedDayOfWeek] = useState<string>(dayOfWeek);

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
		setDisplayedDayOfWeek(dayOfWeek);
	}

	function formatDate(date: Date) {
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		const year = date.getFullYear();

		return `${year}-${month}-${day}`;
	}

	return (
		<>
			<header className='header'>
				<div>
					<label htmlFor="startDateInput">Start Date</label>
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
				<div>
					<label htmlFor="endDateInput">End Date</label>
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
				<div>
					<label htmlFor="dayOfWeekSelect">Day of Week</label>
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
				</div>
			</header>

			<main className='main'>
				<h1>Dates on { displayedDayOfWeek }</h1>
				<div className='dates-container container'>
					{
						dates.map(date => {
							return <div className='date' key={date}>{ date }</div>
						})
					}
				</div>
			</main>

			<footer className='footer'>
				<button 
					className='button'
					onClick={getDatesForDayOfWeek}
				>
					Get Dates
				</button>
			</footer>
    	</>
  	);
}

export default App;