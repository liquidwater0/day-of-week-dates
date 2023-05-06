import { useState, ReactNode, HTMLAttributes, MouseEvent } from "react";

type ButtonProps = {
    children: ReactNode,
    className?: string
} & HTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className, onClick, ...props }: ButtonProps) {
    const [ripples, setRipples] = useState<{ id: string, x: number, y: number }[]>([]);

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        if (onClick) onClick(event);

        const rect = (event.target as HTMLButtonElement).getBoundingClientRect();
        const clickedX = event.clientX - rect.x - 10;
        const clickedY = event.clientY - rect.y - 10;

        setRipples(prevRipples => {
            return [
                ...prevRipples,
                { 
                    id: crypto.randomUUID(), 
                    x: clickedX, 
                    y: clickedY 
                }
            ];
        });
    }

    return (
        <button 
            className={`button ${className ? className : ""}`}
            onClick={handleClick}
            { ...props }
        >
            { children }
            {ripples.map(({ id, x, y }) =>
                <span 
                    key={id} 
                    className="ripple"
                    style={{ left: x, top: y }}
                    onAnimationEnd={() => {
                        setRipples(prevRipples => prevRipples.filter(ripple => ripple.id !== id))
                    }}
                />  
            )}
        </button>
    );
}