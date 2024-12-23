import React, { memo } from "react";
import { Editor } from "@tinymce/tinymce-react";
const MarkdownEditer = ({
  label,
  value,
  changeValue,
  name,
  invalidFields,
  setInvalidFields,
  errors,
}) => {
  const handleChange = (content) => {
    changeValue(content);
    if (content.trim() === "") {
      setInvalidFields((prev) => ({ ...prev, [name]: true }));
    } else {
      setInvalidFields((prev) => ({ ...prev, [name]: false }));
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <span className="text-main text-sm">{label}</span>
      <Editor
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        initialValue={value}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onChange={(e) => handleChange(e.target.getContent())}
        onFocus={() => setInvalidFields((prev) => ({ ...prev, [name]: false }))}
      />
      {errors[name] && (
        <small className="text-main text-sm">{errors[name]?.message}</small>
      )}
      {invalidFields[name] && (
        <small className="text-red-500 text-sm">
          Nội dung không được để trống.
        </small>
      )}
    </div>
  );
};
export default memo(MarkdownEditer);
