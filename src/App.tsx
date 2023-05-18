import { useState } from 'react';
import "./scss/App.scss";
import { getFormattedDate } from './utils/getFormattedDate';
import Button from './components/Button';
import DateButton from './components/DateButton';
import DateInput from './components/DateInput';

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
				<div className="dates-container">
					{dates.map(date => 
						<DateButton
							key={date}
							date={date}
						/>
					)}
				</div>
			</main>

			<footer className='footer container'>
				<div className='input-container'>
					<label htmlFor="startDateInput">From</label>
					<DateInput 
						id='startDateInput'
						defaultValue={getFormattedDate(startDate)}
						onDateChange={date => {
							const [year, month, day] = date.split("-");
							setStartDate(new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
						}}
					/>
				</div>

				<Button onClick={getDatesForDayOfWeek}>
					Get Dates
				</Button>

				<div className='input-container'>
					<label htmlFor="endDateInput">To</label>
					<DateInput
						id='endDateInput'
						defaultValue={getFormattedDate(endDate)}
						onDateChange={date => {
							const [year, month, day] = date.split("-");
							setEndDate(new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
						}}
					/>
				</div>
			</footer>
    	</>
  	);
}

export default App;