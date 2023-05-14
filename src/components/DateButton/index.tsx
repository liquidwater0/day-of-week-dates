import { useState } from "react";
import Modal from "../Modal";

export default function DateButton({ date }: { date: string }) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const dateObj = new Date(date);

    return (
        <>
            <button 
                className='date-button' 
                title={dateObj.toDateString()}
                onClick={() => setModalOpen(prev => !prev)}
            >
                { date }
            </button>

            {
                modalOpen &&
                <Modal 
                    date={dateObj}
                    setIsOpen={setModalOpen}
                /> 
            }
        </>
    );
}