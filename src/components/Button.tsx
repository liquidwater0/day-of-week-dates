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
            {ripples.map(ripple =>
                <span 
                    key={ripple.id} 
                    className="ripple"
                    onAnimationEnd={() => {
                        setRipples(prevRipples => prevRipples.filter(r => r.id !== ripple.id))
                    }}
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                    }}
                />  
            )}
        </button>
    );
}