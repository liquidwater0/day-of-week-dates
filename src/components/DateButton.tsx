export default function DateButton({ date }: { date: string }) {
    return (
        <button 
            className='date-button' 
            // onClick={() => console.log(date)}
        >
            { date }
        </button>
    );
}