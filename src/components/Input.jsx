export default function Input({ valueProp, labelProp, placeholderProp, typeProp, inputId, onChangeProp, isReadOnly = false }) {
  return (
    <>
      <label htmlFor={inputId} className="block mb-2 text-sm font-medium text-dark dark:text-light">{labelProp}</label>
      {
        valueProp ?
          <input value={valueProp} onChange={(e) => {
            onChangeProp(e.target.value)
          }} placeholder={placeholderProp} type={typeProp} id={inputId} className="block w-full p-2 text-dark rounded-lg bg-gray-50 outline outline-gray-300 text-sm focus:outline-amber-500  dark:bg-gray-700 dark:outline-gray-600 dark:placeholder-gray-400 dark:text-light transition-all" readOnly={isReadOnly} />
          :
          <input onChange={(e) => {
            onChangeProp(e.target.value)
          }} placeholder={placeholderProp} type={typeProp} id={inputId} className="block w-full p-2 text-dark rounded-lg bg-gray-50 outline outline-gray-300 text-sm focus:outline-amber-500  dark:bg-gray-700 dark:outline-gray-600 dark:placeholder-gray-400 dark:text-light transition-all" readOnly={isReadOnly} />
      }
    </>
  )
}