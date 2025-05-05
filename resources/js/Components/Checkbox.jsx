export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={`rounded-md border-2 border-gray-500 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out hover:border-indigo-500 hover:bg-indigo-50 checked:border-indigo-600 checked:bg-indigo-600 checked:ring-2 checked:ring-indigo-500 ${className}`}
        />
    );
}
