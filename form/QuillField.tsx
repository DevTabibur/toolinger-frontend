import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import 'quill/dist/quill.snow.css';

export const QuillField = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
    const { quill, quillRef } = useQuill({ theme: 'snow' });

    useEffect(() => {
        if (!quill) return;

        // initial value
        if (value) quill.clipboard.dangerouslyPasteHTML(value);

        // sync to formik on change
        quill.on('text-change', () => {
            onChange(quill.root.innerHTML);
        });
    }, [quill]);

    return <div className="min-h-[180px]" ref={quillRef} />;
}
