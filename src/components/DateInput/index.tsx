import type { HTMLAttributes, ChangeEvent } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useFirstRenderEffect } from '../../hooks/useFirstRenderEffect';
import { checkValidDate } from '../../utils/checkValidDate';
import { getFormattedDate } from '../../utils/getFormattedDate';

type DateInputProps = {
    onDateChange?: (date: string) => void
} & HTMLAttributes<HTMLInputElement>;

export default function DateInput({ onDateChange, ...props }: DateInputProps) {
    const dateInputRef = useRef<HTMLInputElement>(null!);

    const monthInputRef = useRef<HTMLInputElement>(null!);
    const dayInputRef = useRef<HTMLInputElement>(null!);
    const yearInputRef = useRef<HTMLInputElement>(null!);

    const [month, setMonth] = useState<number>(0);
    const [day, setDay] = useState<number>(0);
    const [year, setYear] = useState<number>(0);

    const [isValid, setIsValid] = useState<boolean>(true);

    useEffect(() => {
        const dateInput = dateInputRef.current;
        const [year, month, day] = dateInput.value.split("-");
        const date = new Date(dateInput.value);
        
        setYear(+year);
        setMonth(+month);
        setDay(+day);

        if (checkValidDate(new Date(date))) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, []);

    useFirstRenderEffect(() => {
        const dateInput = dateInputRef.current;
        const date = new Date(`${year}-${month}-${day}`);

        if (checkValidDate(date)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
        
        dateInput.value = getFormattedDate(date);

        if (onDateChange) {
            onDateChange(dateInput.value);
        }
    }, [month, day, year]);

    function handleMonthChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setMonth(+value);

        // if (monthInputRef.current.value.length >= 2) {
        //     dayInputRef.current.focus();
        // }
    }

    function handleDayChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setDay(+value);

        // if (dayInputRef.current.value.length >= 2) {
        //     yearInputRef.current.focus();
        // }
    }

    function handleYearChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
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