"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useMediaQuery } from "@mui/material";

export function CustomEditor({ initialValue, editorRef }) {
    const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

    return (
        <>
        {/* Component is not controlled here for performance reasons
        (https://www.tiny.cloud/docs/tinymce/latest/react-ref/#using-the-tinymce-react-component-as-a-controlled-component) */}
        <Editor
            initialValue={initialValue}
            apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            toolbarMode="floating"
            // inline={true}
            init={{
            height: mdUp ? 500 : 350,
            menubar: false,
            statusbar: false,
            plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "preview",
                "wordcount",
            ],
            toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat",
            toolbar_mode: "floating",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            />
        </>
    );
  }
