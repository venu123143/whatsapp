import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { setErrors, setActivePin } from "../../Redux/reducers/Calls/CallsReducer"

const ToggleSwitch = () => {
    const dispatch: AppDispatch = useDispatch()
    const { activePin } = useSelector((state: RootState) => state.calls)
    const handleToggle = () => {
        dispatch(setActivePin(!activePin))
        if (activePin === false) {
            dispatch(setErrors({}))
        }
    };

    return (
        <div className="flex items-center mb-12 last:mb-0 md:cursor-pointer">
            <div className={`relative border-2 border-gray-300 rounded-full px-1 py-0.5 bg-gradient-to-br from-white to-gray-200 shadow-sm flex items-center cursor-pointer`}>
                <input id="one" type="checkbox" checked={activePin} onChange={handleToggle} className="hidden" />
                <label htmlFor="one" className={`w-16  cursor-pointer h-5 rounded-full shadow-inner transition-colors duration-500 ${activePin ? 'bg-green-500' : 'bg-red-600'}`}>
                    <div
                        className={`absolute top-[-6px] w-9 h-9 rounded-full border border-gray-300 bg-repeating-radial-gradient bg-conic-gradient shadow transition-transform duration-500 ${activePin ? 'translate-x-full' : '-translate-x-0 left-[-3px]'
                            }`}
                    />
                </label>
            </div>
        </div>
    );
};

export default ToggleSwitch;