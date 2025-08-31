
import * as Yup from "yup";

// Validation schema
export const ArticleSchema = Yup.object().shape({
    slug: Yup.string()
        .required("Slug is required")
        .matches(
            /^(?!\/)([a-zA-Z0-9-]+)$/,
            "Slug must not start with a slash and only contain letters, numbers, and hyphens"
        )
        .test(
            "no-slash",
            "Slug must not start with a slash",
            (value) => value ? !value.startsWith("/") : false
        ),
    content: Yup.string()
        .required("Content is required")
        .test("not-empty", "Content is required", (value) => {
            // Remove html tags and check if not empty
            if (!value) return false;
            const text = value.replace(/<(.|\n)*?>/g, "").trim();
            return text.length > 0;
        }),
    // image: Yup.mixed().nullable(),
    // imageAlt: Yup.string().max(150, "Image alt text too long").nullable(),
});