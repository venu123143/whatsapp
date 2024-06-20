
import { RootState } from "../../Redux/store";
import { BsSearch, BsFilter } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { handleChatSearchValue } from "../../Redux/reducers/msg/MsgReducer"
const SearchBar = () => {
    const dispatch = useDispatch();
    const { chatSearchValue } = useSelector((store: RootState) => store.msg);

    return (
        // fixed w-3/12 top-16
        <section className="h-14 ">
            <div className="bg-[#111b21] flex py-3 pl-5 items-center gap-3">
                <div className="bg-[#202c33] flex items-center gap-5 flex-grow px-3 py-1 rounded-lg">
                    <div>
                        <BsSearch className="time cursor-pointer text-lg" />
                    </div>
                    <div className="w-full">
                        <input
                            type="text"
                            value={chatSearchValue}
                            placeholder="Search or start new chat"
                            className="bg-transparent text-sm focus:outline-none text-white w-full "
                            onChange={(e: any) =>
                                dispatch(handleChatSearchValue(e.target.value))
                            }
                        />
                    </div>
                </div>
                <div className="pr-5 pl-3">
                    <BsFilter size={20} className="time cursor-pointer text-l" />
                </div>
            </div>
        </section>
    );
};

export default SearchBar;
