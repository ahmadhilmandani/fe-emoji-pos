export default function Input({ valueProp, labelProp, placeholderProp, typeProp, inputId, onChangeProp, isReadOnly = false, isRequired = true }) {
  return (
    <>
      <label htmlFor={inputId} className="block mb-2 text-sm font-medium text-dark">{labelProp} {isRequired && <span className="text-red-500">*</span>}</label>
      {
        <input value={valueProp} onChange={(e) => {
          onChangeProp(e.target.value)
        }} placeholder={placeholderProp} type={typeProp} id={inputId} className="block w-full p-2 text-dark rounded-lg bg-gray-50 outline outline-gray-300 text-sm focus:outline-amber-500 transition-all" readOnly={isReadOnly} />
      }
    </>
  )
}