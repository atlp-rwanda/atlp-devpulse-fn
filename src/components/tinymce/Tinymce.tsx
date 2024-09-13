import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
export default function Tinymce({ onChange, value }) {
  const editorRef: any = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        onChange={onChange}
        value={value}
        apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        // initialValue=""
        init={{
          height: 220,
          // menubar: false,
          placeholder: "Write your Email Here.....",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button type="submit" onClick={log}>
        Log editor content
      </button>
    </>
  );
}
