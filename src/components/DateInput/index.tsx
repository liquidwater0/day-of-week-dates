import type { HTMLAttributes, ChangeEvent } from 'react';
import { useState, useEffect, useRef } from 'react';
import { checkValidDate } from '../../utils/checkValidDate';

type DateInputProps = HTMLAttributes<HTMLInputElement>;

//Fix valid state not working properly
export default function DateInput({ ...props }: DateInputProps) {
    const dateInputRef = useRef<HTMLInputElement>(null!);

    const monthInputRef = useRef<HTMLInputElement>(null!);
    const dayInputRef = useRef<HTMLInputElement>(null!);
    const yearInputRef = useRef<HTMLInputElement>(null!);

    const [month, setMonth] = useState<number>(0);
    const [day, setDay] = useState<number>(0);
    const [year, setYear] = useState<number>(0);

    const [isValid, setIsValid] = useState<boolean>();

    useEffect(() => {
        const dateInput = dateInputRef.current;
        const [year, month, day] = dateInput.value.split("-");
        
        setYear(+year);
        setMonth(+month);
        setDay(+day);
    }, []);

    useEffect(() => {
        const dateInput = dateInputRef.current;

        if (checkValidDate(new Date(dateInput.value))) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [month, day, year]);

    function handleMonthChange(event: ChangeEvent) {
        const value = (event.target as HTMLInputElement).value;
        setMonth(+value);

        if (monthInputRef.current.value.length >= 2) {
            dayInputRef.current.focus();
        }
    }

    function handleDayChange(event: ChangeEvent) {
        const value = (event.target as HTMLInputElement).value;
        setDay(+value);

        if (dayInputRef.current.value.length >= 2) {
            yearInputRef.current.focus();
        }
    }

    function handleYearChange(event: ChangeEvent) {
        const value = (event.target as HTMLInputElement).value;
        setYear(+value);
    }

    return (
        <div className='date-input' data-valid={isValid ? "true" : "false"}>
            <div className="date-input-section">
                <input 
                    type="number"
                    placeholder='mm'
                    value={month ? month : ""}
                    ref={monthInputRef}
                    onChange={handleMonthChange}
                />
            </div>
            <div className="date-input-section">
                <input 
                    type="number"
                    placeholder='dd'
                    value={day ? day : ""}
                    ref={dayInputRef}
                    onChange={handleDayChange}
                />
            </div>
            <div className="date-input-section">
                <input 
                    type="number"
                    placeholder='yyyy'
                    value={year ? year : ""}
                    ref={yearInputRef}
                    onChange={handleYearChange}
                />
            </div>

            <input 
                type="date" 
                style={{ display: "none" }}
                ref={dateInputRef}
                { ...props }
            />
        </div>
    );
}