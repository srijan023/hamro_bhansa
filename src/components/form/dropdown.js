import { FaAngleDown } from "react-icons/fa";

export default function Dropdown({
  isActiveMenu,
  toggleDisplay,
  categories,
  handleOptionClicked,
  itemCategory,
}) {
  return (
    <div
      className={`relative ${
        isActiveMenu ? "border-primary" : "border-gray-500"
      } text-gray-400 px-3 py-2 rounded-md border w-[180px]`}
    >
      <div
        className="curosr-pointer flex items-center justify-between gap-3"
        onClick={toggleDisplay}
      >
        <p>{itemCategory}</p>
        <div
          className={`transform transition-transform duration-500 ease-in-out ${
            isActiveMenu ? "rotate-180" : ""
          }`}
        >
          <FaAngleDown />
        </div>
      </div>
      <div
        className={` ${
          isActiveMenu ? "" : "hidden"
        } absolute top-12 rounded-md border border-gray-500 left-0 right-0 mx-auto bg-white`}
      >
        <ul className="text-center flex flex-col">
          {categories.map((cat) => {
            return (
              <li
                key={cat.name}
                onClick={handleOptionClicked}
                className="p-2 rounded-md hover:bg-orange-100 cursor-pointer"
                value="category1"
              >
                {cat.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
