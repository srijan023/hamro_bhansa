export default function PrimaryButton ({btnType="", text, disabled = false}) {
  return(
            <button type={btnType} className="px-4 py-2 bg-primary text-white disabled:hover:scale-100 disabled:bg-gray-300 hover:scale-105 rounded-full" disabled={disabled}>{text}</button>
  )
}
