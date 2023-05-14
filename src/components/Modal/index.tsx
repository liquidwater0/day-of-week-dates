import type { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "../Button";

type ModalProps = {
    date: Date,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function Modal({ date, setIsOpen }: ModalProps) {
    const [dateString] = useState<string>(() => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = months[date.getMonth()];
        const day = date.getDate();

        return `${month} ${day}`;
    });
    const [yearString] = useState<string>(date.getFullYear().toString());
    const [dateFact, setDateFact] = useState<string>("");
    const [yearFact, setYearFact] = useState<string>("");

    useEffect(() => {
        fetch(`http://numbersapi.com/${date.getMonth() + 1}/${date.getDate()}/date`)
            .then(res => res.text())
            .then(setDateFact);
        fetch(`http://numbersapi.com/${date.getFullYear()}/year`)
            .then(res => res.text())
            .then(setYearFact);
    }, []);

    return createPortal(
        <div className="modal-container">
            <div 
                className="overlay"
                onClick={() => setIsOpen(false)}
            />

            <div className="modal">
                <header className="modal-header">
                    <h2 className="modal-title">Date Facts</h2>
                </header>

                <div className="modal-body">
                    <div className="modal-content-group">
                        <p className="modal-content-group-title">{ dateString }</p>
                        <p className="modal-content-group-content">{ dateFact }</p>
                    </div>
                    <div className="modal-content-group">
                        <p className="modal-content-group-title">{ yearString }</p>
                        <p className="modal-content-group-content">{ yearFact }</p>
                    </div>
                </div>

                <footer className="modal-footer">
                    <Button onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                </footer>
            </div>
        </div>,
        document.querySelector("#portal") as HTMLDivElement
    );
}