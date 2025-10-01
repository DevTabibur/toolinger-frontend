// import { useEffect } from "react";
// import { useQuill } from "react-quilljs";
// import 'quill/dist/quill.snow.css';

// export const QuillField = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
//     const { quill, quillRef } = useQuill({ theme: 'snow' });

//     useEffect(() => {
//         if (!quill) return;

//         // initial value
//         if (value) quill.clipboard.dangerouslyPasteHTML(value);

//         // sync to formik on change
//         quill.on('text-change', () => {
//             onChange(quill.root.innerHTML);
//         });
//     }, [quill]);

//     return <div className="min-h-[180px]" ref={quillRef} />;
// }


import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import 'quill/dist/quill.snow.css';

export const QuillField = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }], // ✅ H1-H5 headings
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"]
    ]
  };

  const formats = [
    "header",
    "bold", "italic", "underline", "strike",
    "list", "bullet",
    "align",
    "link", "image"
  ];

  const { quill, quillRef } = useQuill({ theme: "snow", modules, formats });

  useEffect(() => {
    if (!quill) return;

    // initial value
    if (value) quill.clipboard.dangerouslyPasteHTML(value);

    // sync with formik or parent
    quill.on("text-change", () => {
      onChange(quill.root.innerHTML);
    });
  }, [quill]);

  return <div className="min-h-[200px]" ref={quillRef} />;
};
