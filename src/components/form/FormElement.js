export default function FormElement({
  type = "text",
  label = "",
  disabled = false,
  placeholder = "",
  idName,
  value = "",
  width = "",
  onChange,
}) {
  return (
    <div className={`flex flex-col gap-2 text-gray-500 ${width}`}>
      <label
        htmlFor={idName}
        className={`text-primary ml-2 ${label.length === 0 ? "hidden" : ""}`}
      >
        {label}
      </label>
      <input
        name={idName}
        className="py-2 px-5 bg-white outline-0 border rounded-md border-gray-500 "
        disabled={disabled}
        type={type}
        value={value}
        onChange={onChange}
        id={idName}
        placeholder={placeholder}
      />
    </div>
  );
}
