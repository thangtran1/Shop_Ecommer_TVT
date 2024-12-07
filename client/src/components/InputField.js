// import React from "react";

// const InputField = ({
//   value = "",
//   setValue,
//   nameKey,
//   type,
//   inValidFields,
//   setInValidFields,
// }) => {
//   return (
//     <div className="w-full flex flex-col relative mb-2 ">
//       {value.trim() !== "" && (
//         <label className="text-[10px] animation-slide-top-sm absolute left-2 top-0 block bg-white px-2 transition-all duration-200">
//           {nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
//         </label>
//       )}
//       <input
//         type={type || "text"}
//         className="px-4 py-2 rounded-sm border w-full mt-2 outline-none placeholder:text-sm placeholder:italic"
//         placeholder={nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
//         value={value}
//         onChange={(e) =>
//           setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
//         }
//       />
//       {inValidFields?.some((el) => el.name === nameKey) && (
//         <small className="text-main text-[10px] italic">
//           {inValidFields.find((el) => el.name === nameKey)?.message}
//         </small>
//       )}
//     </div>
//   );
// };

// export default InputField;
