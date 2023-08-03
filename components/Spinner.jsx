import { ImSpinner9 } from 'react-icons/im'

const Spinner = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center flex-col z-20">
            <ImSpinner9 className='text-7xl text-pink-600 animate-spin' />
        </div>
    )
};

export default Spinner;