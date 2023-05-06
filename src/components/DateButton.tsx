export default function DateButton({ date }: { date: string }) {
    return (
        <button 
            className='date-button' 
            title={new Date(date).toDateString()}
            // onClick={() => console.log(date)}
        >
            { date }
        </button>
    );
}