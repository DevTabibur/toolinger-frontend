// "use client"

// import React, { useEffect, useRef, useState } from "react"
// import { motion } from "framer-motion"
// import { ErrorMessage, useFormik } from "formik"
// import * as Yup from "yup"
// import { Save, Eye, Upload, Tag, Calendar, Edit3, X, ImageIcon } from "lucide-react"
// import { getAllCategories } from "@/app/api/BlogCategory.api"
// import { QuillField } from "@/form/QuillField"
// import { Button } from "@/components/ui/button"
// import toast from "react-hot-toast"
// import { createBlogPost } from "@/app/api/Blog.Api"

// // Slugify function: generates a slug like "how-to-use-ai"
// function slugify(str: string) {
//   return str
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9\s-]/g, "") // remove invalid chars
//     .replace(/\s+/g, "-") // spaces to hyphens
//     .replace(/-+/g, "-") // collapse multiple hyphens
// }

// const validationSchema = Yup.object({
//   title: Yup.string()
//     .min(10, "Title must be at least 10 characters")
//     .max(100, "Title must be less than 100 characters")
//     .required("Title is required"),
//   slug: Yup.string()
//     .matches(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens")
//     .required("Slug is required"),
//   excerpt: Yup.string()
//     .min(50, "Excerpt must be at least 50 characters")
//     .max(300, "Excerpt must be less than 300 characters")
//     .required("Excerpt is required"),
//   content: Yup.string().min(100, "Content must be at least 100 characters").required("Content is required"),
//   category: Yup.string().required("Category is required"),
//   tags: Yup.string().required("At least one tag is required"),
//   // featuredImage: Yup.string().url("Must be a valid URL"), // Remove URL validation for file upload
//   metaTitle: Yup.string().max(60, "Meta title should be under 60 characters"),
//   metaDescription: Yup.string().max(160, "Meta description should be under 160 characters"),
//   status: Yup.string().oneOf(["draft", "published", "archived"]).required("Status is required"),
//   isAllowComments: Yup.boolean().optional(),
//   isFeaturedPost: Yup.boolean().optional()
// })

// export default function BlogCreateClient() {
//   // Track if user has manually edited the slug
//   const [slugManuallyEdited, setSlugManuallyEdited] = React.useState(false)

//   // Categories state
//   const [categories, setCategories] = React.useState<
//     { _id: string; name: string }[]
//   >([])
//   const [categoriesLoading, setCategoriesLoading] = React.useState(true)
//   const [categoriesError, setCategoriesError] = React.useState<string | null>(null)

//   // Tag input state for UI
//   const [tagInput, setTagInput] = React.useState("")
//   // Tags as array for UI
//   const [tagsArray, setTagsArray] = React.useState<string[]>([])

//   // Featured image state
//   const [featuredImageError, setFeaturedImageError] = useState<string | null>(null)
//   const [featuredImage, setFeaturedImage] = useState<File | null>(null)
//   const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null)
//   const [dragActive, setDragActive] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement | null>(null)

//   // Sync tagsArray <-> formik.values.tags
//   React.useEffect(() => {
//     // On mount, if formik.values.tags is not empty, split and set
//     if (formik.values.tags && tagsArray.length === 0) {
//       setTagsArray(
//         formik.values.tags
//           .split(",")
//           .map((t) => t.trim())
//           .filter((t) => t)
//       )
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   React.useEffect(() => {
//     // Whenever tagsArray changes, update formik.values.tags
//     formik.setFieldValue("tags", tagsArray.join(", "))
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [tagsArray])

//   // Fetch categories from API
//   useEffect(() => {
//     async function fetchCategories() {
//       setCategoriesLoading(true)
//       setCategoriesError(null)
//       try {
//         const res = await getAllCategories()
//         console.log("res", res)
//         if (res?.statusCode == 200) {
//           setCategories(res.data)
//         }

//       } catch (err: any) {
//         setCategoriesError(err.message || "Error fetching categories")
//         setCategories([])
//       } finally {
//         setCategoriesLoading(false)
//       }
//     }
//     fetchCategories()
//   }, [])

//   const formik = useFormik({
//     initialValues: {
//       title: "",
//       slug: "",
//       excerpt: "",
//       content: "",
//       category: "",
//       tags: "",
//       featuredImage: "",
//       metaTitle: "",
//       metaDescription: "",
//       status: "draft",
//       author: "",
//       allowComments: true,
//       isFeatured: false,
//     },
//     validationSchema,
//     onSubmit: async (values: any, { setSubmitting, setFieldError, resetForm }: any) => {
//       console.log("Form Values:", values)



//       let categoryId = ""
//       setFeaturedImageError(null)
//       // setTagsError(null)
//       // setCategoryError(null)
//       try {
//         const parsed = JSON.parse(values.category)
//         categoryId = parsed._id
//       } catch {
//         categoryId = values.category
//       }

//       let hasError = false

//       // if (!tags.length) {
//       //   setFieldError("tags", "At least one tag is required")
//       //   setTagsError("At least one tag is required")
//       //   hasError = true
//       // }

//       if (!featuredImage) {
//         setFieldError("featuredImage", "Featured image is required")
//         setFeaturedImageError("Featured image is required")
//         hasError = true
//       }

//       // if (!values.category) {
//       //   setFieldError("category", "Category is required")
//       //   setCategoryError("Category is required")
//       //   hasError = true
//       // }

//       if (hasError) {
//         setSubmitting(false)
//         return
//       }

//       // Prepare FormData to send image and all blog data
//       const formData = new FormData();
//       formData.append("title", values.title);
//       formData.append("slug", values.slug);
//       formData.append("content", values.content);
//       formData.append("status", values.status);
//       formData.append("excerpt", values.excerpt);
//       formData.append("author", values.author);
//       formData.append("category", categoryId);
//       formData.append("tags", values.tags);
//       formData.append("blogFeaturedImage", featuredImage as any);
//       formData.append("isAllowComments", values.allowComments);
//       formData.append("isFeaturedPost", values.isFeatured);


//       //=================
//       formData.append("seoTitle", values.metaTitle);
//       formData.append("seoDescription", values.metaDescription);
//       formData.append("seoKeywords", values.seoKeywords);

//       try {
//         const res = await createBlogPost(formData)
//         // console.log("res", res)
//         if (res.statusCode === 200) {
//           resetForm()
//           // setTags([])
//           setFeaturedImage(null)
//           setFeaturedImagePreview(null)
//           setFeaturedImageError(null)
//           // setTagsError(null)
//           // setCategoryError(null)
//           // Reset QuillField by dispatching an event to clear content
//           const quillEditor = document.querySelector('.ql-editor');
//           if (quillEditor) {
//             quillEditor.innerHTML = '';
//           }
//           toast.success("Blog Created Successfully")
//           // router.push("/dashboard/blog")
//         }
//       } catch (err: any) {
//         toast.error("Error creating blog")
//       } finally {
//         setSubmitting(false)
//       }

//     },
//   })

//   // Auto-generate slug from title, unless user has manually edited slug
//   React.useEffect(() => {
//     if (formik.values.title && !slugManuallyEdited) {
//       const slug = slugify(formik.values.title)
//       formik.setFieldValue("slug", slug)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [formik.values.title])

//   // Handler for slug field: if user types in slug, mark as manually edited
//   const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSlugManuallyEdited(true)
//     formik.setFieldValue("slug", e.target.value)
//   }

//   // Handler for title field: if user edits title, and slug was previously manually edited and then cleared, allow auto-generation again
//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     formik.handleChange(e)
//     if (slugManuallyEdited && formik.values.slug === "") {
//       setSlugManuallyEdited(false)
//     }
//   }

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },


//   }




//   // Handle file input change, store File object and preview URL
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files && e.target.files[0]
//     if (file) {
//       setFeaturedImage(file)
//       setFeaturedImagePreview(URL.createObjectURL(file))
//       setFeaturedImageError(null)
//     }
//   }

//   // Handle drag and drop, store File object and preview URL
//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault()
//     e.stopPropagation()
//     setDragActive(true)
//   }

//   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault()
//     e.stopPropagation()
//     setDragActive(false)
//   }

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault()
//     e.stopPropagation()
//     setDragActive(false)
//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       const file = e.dataTransfer.files[0]
//       setFeaturedImage(file)
//       setFeaturedImagePreview(URL.createObjectURL(file))
//       setFeaturedImageError(null)
//     }
//   }

//   const handleChooseImageClick = () => {
//     fileInputRef.current?.click()
//   }

//   const handleRemoveImage = () => {
//     setFeaturedImage(null)
//     setFeaturedImagePreview(null)
//     setFeaturedImageError("Featured image is required")
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//   }

//   return (
//     <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto">
//       <motion.div variants={itemVariants} className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create New Blog Post</h1>
//         <p className="text-gray-600 dark:text-gray-400">Write and publish engaging content for your audience</p>
//       </motion.div>

//       <form onSubmit={formik.handleSubmit} className="space-y-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Basic Information */}
//             <motion.div
//               variants={itemVariants}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
//             >
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
//                 <Edit3 className="w-5 h-5 mr-2 text-[#005c82]" />
//                 Basic Information
//               </h2>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formik.values.title}
//                     onChange={handleTitleChange}
//                     onBlur={formik.handleBlur}
//                     className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                     placeholder="Enter blog post title..."
//                   />
//                   {formik.touched.title && formik.errors.title && (
//                     <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
//                   )}
//                 </div>

//                 {/* Show slug field only when title is not empty */}
//                 {formik.values.title && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug *</label>
//                     <input
//                       type="text"
//                       name="slug"
//                       value={formik.values.slug}
//                       onChange={handleSlugChange}
//                       onBlur={formik.handleBlur}
//                       className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                       placeholder="how-to-use-ai"
//                     />
//                     {formik.touched.slug && formik.errors.slug && (
//                       <p className="mt-1 text-sm text-red-600">{formik.errors.slug}</p>
//                     )}
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Excerpt *</label>
//                   <textarea
//                     {...formik.getFieldProps("excerpt")}
//                     rows={3}
//                     className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                     placeholder="Brief description of the blog post..."
//                   />
//                   {formik.touched.excerpt && formik.errors.excerpt && (
//                     <p className="mt-1 text-sm text-red-600">{formik.errors.excerpt}</p>
//                   )}
//                 </div>
//               </div>
//             </motion.div>

//             {/* Content */}
//             <motion.div
//               variants={itemVariants}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
//             >
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Content *</h2>

//               <div
//                 className={`quill-field-wrapper rounded-md border px-3 py-2 min-h-[180px] bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-colors duration-200 ${formik.touched.content && formik.errors.content ? "border-red-500 dark:border-red-500" : ""
//                   }`}
//               >
//                 <QuillField
//                   value={formik.values.content}
//                   onChange={(val) => formik.setFieldValue("content", val)}
//                 />
//               </div>
//               {formik.touched.content && formik.errors.content && (
//                 <p className="mt-1 text-sm text-red-600">{formik.errors.content}</p>
//               )}

//             </motion.div>

//             {/* SEO Settings */}
//             <motion.div
//               variants={itemVariants}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
//             >
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">SEO Settings</h2>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Title</label>
//                   <input
//                     type="text"
//                     {...formik.getFieldProps("metaTitle")}
//                     className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                     placeholder="SEO optimized title..."
//                   />
//                   {formik.touched.metaTitle && formik.errors.metaTitle && (
//                     <p className="mt-1 text-sm text-red-600">{formik.errors.metaTitle}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Meta Description
//                   </label>
//                   <textarea
//                     {...formik.getFieldProps("metaDescription")}
//                     rows={3}
//                     className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                     placeholder="SEO meta description..."
//                   />
//                   {formik.touched.metaDescription && formik.errors.metaDescription && (
//                     <p className="mt-1 text-sm text-red-600">{formik.errors.metaDescription}</p>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Publish Settings */}
//             <motion.div
//               variants={itemVariants}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
//             >
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
//                 <Calendar className="w-5 h-5 mr-2 text-[#005c82]" />
//                 Publish Settings
//               </h3>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status *</label>
//                   <select
//                     {...formik.getFieldProps("status")}
//                     className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                   >
//                     <option value="draft">Draft</option>
//                     <option value="published">Published</option>
//                     <option value="archived">Archived</option>
//                     {/* <option value="scheduled">Scheduled</option> */}
//                   </select>
//                 </div>

//                 {/* {formik.values.status === "scheduled" && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Publish Date *
//                     </label>
//                     <input
//                       type="datetime-local"
//                       {...formik.getFieldProps("publishDate")}
//                       className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                     />
//                     {formik.touched.publishDate && formik.errors.publishDate && (
//                       <p className="mt-1 text-sm text-red-600">{formik.errors.publishDate}</p>
//                     )}
//                   </div>
//                 )} */}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Author</label>
//                   <input
//                     type="text"
//                     {...formik.getFieldProps("author")}
//                     className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                     placeholder="Author name..."
//                   />
//                 </div>

//                 {/* <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Reading Time (minutes)
//                   </label>
//                   <input
//                     type="number"
//                     {...formik.getFieldProps("readingTime")}
//                     className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                     placeholder="5"
//                   />
//                 </div> */}
//               </div>
//             </motion.div>

//             {/* Categories & Tags */}
//             <motion.div
//               variants={itemVariants}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
//             >
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
//                 <Tag className="w-5 h-5 mr-2 text-[#005c82]" />
//                 Categories & Tags
//               </h3>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
//                   <select
//                     {...formik.getFieldProps("category")}
//                     className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                     disabled={categoriesLoading}
//                   >
//                     <option value="">Select Category</option>
//                     {categoriesLoading && (
//                       <option value="" disabled>
//                         Loading categories...
//                       </option>
//                     )}
//                     {categoriesError && (
//                       <option value="" disabled>
//                         {categoriesError}
//                       </option>
//                     )}
//                     {!categoriesLoading &&
//                       !categoriesError &&
//                       categories.map((cat) => (
//                         <option key={cat._id} value={cat._id}>
//                           {cat.name}
//                         </option>
//                       ))}
//                   </select>
//                   {formik.touched.category && formik.errors.category && (
//                     <p className="mt-1 text-sm text-red-600">{formik.errors.category}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Tags * (comma separated)
//                   </label>
//                   <input
//                     type="text"
//                     {...formik.getFieldProps("tags")}
//                     className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                     placeholder="tag1, tag2, tag3"
//                   />
//                   {formik.touched.tags && formik.errors.tags && (
//                     <p className="mt-1 text-sm text-red-600">{formik.errors.tags}</p>
//                   )}
//                 </div>
//               </div>
//             </motion.div>

//             {/* Featured Image */}
//             <motion.div
//               variants={itemVariants}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
//             >
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
//                 <Upload className="w-5 h-5 mr-2 text-[#005c82]" />
//                 Featured Image
//               </h3>

//               {featuredImagePreview ? (
//                 <div className="relative">
//                   <img
//                     src={featuredImagePreview || "/placeholder.svg"}
//                     alt="Featured"
//                     className="w-full h-32 object-cover rounded-lg"
//                   />
//                   <Button
//                     type="button"
//                     variant="destructive"
//                     size="sm"
//                     className="absolute top-2 right-2"
//                     onClick={handleRemoveImage}
//                   >
//                     <X className="h-3 w-3" />
//                   </Button>
//                 </div>
//               ) : (
//                 <div
//                   className={`border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center bg-white dark:bg-gray-900 transition-colors duration-150 ${dragActive ? "border-blue-400 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30" : ""}`}
//                   onDragOver={handleDragOver}
//                   onDragLeave={handleDragLeave}
//                   onDrop={handleDrop}
//                   onClick={handleChooseImageClick}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <input
//                     type="file"
//                     accept="image/*"
//                     ref={fileInputRef}
//                     style={{ display: "none" }}
//                     onChange={handleFileChange}
//                   />
//                   <ImageIcon className="h-8 w-8 mx-auto text-gray-400 dark:text-gray-500 mb-2 pointer-events-none" />
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 pointer-events-none">
//                     {dragActive ? "Drop image here..." : "Upload featured image"}
//                   </p>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="sm"
//                     className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white pointer-events-none"
//                     tabIndex={-1}
//                   >
//                     <Upload className="h-4 w-4 mr-2" />
//                     Choose Image
//                   </Button>
//                   <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 pointer-events-none">Drag & drop or click to select</p>
//                 </div>
//               )}
//               {/* <ErrorMessage name="featuredImage" component="div" className="text-red-500 dark:text-red-400 text-sm mt-1" /> */}
//               {/* {featuredImageError && (
//                           <div className="text-red-500 dark:text-red-400 text-sm mt-1">{featuredImageError}</div>
//                         )} */}

//               {/* <div>
//                 <input
//                   type="url"
//                   {...formik.getFieldProps("featuredImage")}
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                   placeholder="https://example.com/image.jpg"
//                 />
//                 {formik.touched.featuredImage && formik.errors.featuredImage && (
//                   <p className="mt-1 text-sm text-red-600">{formik.errors.featuredImage}</p>
//                 )}
//               </div> */}
//             </motion.div>

//             {/* Additional Options */}
//             <motion.div
//               variants={itemVariants}
//               className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
//             >
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Options</h3>

//               <div className="space-y-3">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     {...formik.getFieldProps("allowComments")}
//                     checked={formik.values.allowComments}
//                     className="w-4 h-4 text-[#005c82] border-gray-300 rounded focus:ring-[#005c82]"
//                   />
//                   <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Allow Comments</span>
//                 </label>

//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     {...formik.getFieldProps("isFeatured")}
//                     checked={formik.values.isFeatured}
//                     className="w-4 h-4 text-[#005c82] border-gray-300 rounded focus:ring-[#005c82]"
//                   />
//                   <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Featured Post</span>
//                 </label>
//               </div>
//             </motion.div>

//             {/* Action Buttons */}
//             <motion.div variants={itemVariants} className="space-y-3">
//               <button
//                 type="submit"
//                 disabled={formik.isSubmitting}
//                 className="w-full bg-gradient-to-r from-[#005c82] to-[#00dbed] text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
//               >
//                 <Save className="w-5 h-5 mr-2" />
//                 {formik.isSubmitting ? "Saving..." : "Save Blog Post"}
//               </button>

//               <button
//                 type="button"
//                 className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
//               >
//                 <Eye className="w-5 h-5 mr-2" />
//                 Preview
//               </button>
//             </motion.div>
//           </div>
//         </div>
//       </form>
//     </motion.div>
//   )
// }


//**=========== nazim ======================= */

"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Save, Eye, Upload, Tag, Calendar, Edit3, X, ImageIcon } from "lucide-react"
import { getAllCategories } from "@/app/api/BlogCategory.api"
import { QuillField } from "@/form/QuillField"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { createBlogPost } from "@/app/api/Blog.Api"
import { IBlogFormValues } from "@/types/global-type"

// Slugify function
const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

const validationSchema = Yup.object({
  title: Yup.string().min(10).max(100).required("Title is required"),
  slug: Yup.string()
    .matches(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens")
    .required("Slug is required"),
  excerpt: Yup.string()
    .min(50, "Excerpt must be at least 50 characters")
    .max(160, "Excerpt cannot exceed 160 characters") // ✅ match backend
    .required("Excerpt is required"),
  content: Yup.string().min(100, "Content must be at least 100 characters").required("Content is required"),
  category: Yup.string().required("Category is required"),
  tags: Yup.string().required("At least one tag is required"),
  metaTitle: Yup.string().max(60, "Meta title cannot exceed 60 characters").required("Meta title is required"), // ✅ required
  metaDescription: Yup.string().max(160, "Meta description cannot exceed 160 characters").required("Meta description is required"), // ✅ required
  status: Yup.string().oneOf(["draft", "published", "archived"]).required(),
  allowComments: Yup.boolean(),
  isFeatured: Yup.boolean(),
})


export default function BlogCreateClient() {
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [categoriesError, setCategoriesError] = useState<string | null>(null)
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const formik = useFormik<IBlogFormValues>({
    initialValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      tags: "",
      featuredImage: null,
      metaTitle: "",
      metaDescription: "",
      status: "draft",
      author: "",
      allowComments: true,
      isFeatured: false,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
      let hasError = false

      if (!featuredImage) {
        setFieldError("featuredImage", "Featured image is required")
        hasError = true
      }

      if(!values.author){
        setFieldError("author","Author is required")
      }

      if (!values.category) {
        setFieldError("category", "Category is required")
        hasError = true
      }

      if (!values.tags.trim()) {
        setFieldError("tags", "At least one tag is required")
        hasError = true
      }

      if (hasError) {
        setSubmitting(false)
        return
      }

      const formData = new FormData()
      formData.append("title", values.title)
      formData.append("slug", values.slug)
      formData.append("content", values.content)
      formData.append("status", values.status)
      formData.append("excerpt", values.excerpt)
      formData.append("author", values.author)
      formData.append("category", values.category)
      formData.append("tags", values.tags)
      formData.append("blogFeaturedImage", featuredImage as any)
      formData.append("isAllowComments", String(values.allowComments))
      formData.append("isFeaturedPost", String(values.isFeatured))
      formData.append("seoTitle", values.metaTitle)
      formData.append("seoDescription", values.metaDescription)

      console.log('value ',values);
      

      try {
  const res = await createBlogPost(formData)
  if (res.statusCode === 200) {
    resetForm()
    setFeaturedImage(null)
    setFeaturedImagePreview(null)
    const quillEditor = document.querySelector(".ql-editor")
    if (quillEditor) quillEditor.innerHTML = ""
    toast.success("Blog Created Successfully")
  }
} catch (err: any) {
  if (err?.response?.data?.errorMessages) {
    err.response.data.errorMessages.forEach((e: { path: string; message: string }) => {
      formik.setFieldError(e.path, e.message)
    })
  } else {
    toast.error("Error creating blog")
  }
}

    },
  })

  // Auto-generate slug
  useEffect(() => {
    if (formik.values.title && !slugManuallyEdited) {
      formik.setFieldValue("slug", slugify(formik.values.title))
    }
  }, [formik.values.title, slugManuallyEdited])

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      setCategoriesLoading(true)
      setCategoriesError(null)
      try {
        const res = await getAllCategories()
        if (res?.statusCode === 200) setCategories(res.data)
      } catch (err: any) {
        setCategoriesError(err.message || "Error fetching categories")
        setCategories([])
      } finally {
        setCategoriesLoading(false)
      }
    }
    fetchCategories()
  }, [])

  // File handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFeaturedImage(file)
      setFeaturedImagePreview(URL.createObjectURL(file))
      formik.setFieldError("featuredImage", "")
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(true)
  }
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(false)
  }
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      setFeaturedImage(file)
      setFeaturedImagePreview(URL.createObjectURL(file))
      formik.setFieldError("featuredImage", "")
    }
  }
  const handleChooseImageClick = () => fileInputRef.current?.click()
  const handleRemoveImage = () => {
    setFeaturedImage(null)
    setFeaturedImagePreview(null)
    formik.setFieldError("featuredImage", "Featured image is required")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // Slug manually edited
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugManuallyEdited(true)
    formik.setFieldValue("slug", e.target.value)
  }
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e)
    if (slugManuallyEdited && formik.values.slug === "") setSlugManuallyEdited(false)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
  }
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto">
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create New Blog Post</h1>
        <p className="text-gray-600 dark:text-gray-400">Write and publish engaging content for your audience</p>
      </motion.div>

      <form onSubmit={formik.handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Edit3 className="w-5 h-5 mr-2 text-[#005c82]" /> Basic Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formik.values.title}
                    onChange={handleTitleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter blog post title..."
                  />
                  {formik.touched.title && formik.errors.title && <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>}
                </div>

                {formik.values.title && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug *</label>
                    <input
                      type="text"
                      name="slug"
                      value={formik.values.slug}
                      onChange={handleSlugChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="how-to-use-ai"
                    />
                    {formik.touched.slug && formik.errors.slug && <p className="mt-1 text-sm text-red-600">{formik.errors.slug}</p>}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Excerpt *</label>
                  <textarea
                    {...formik.getFieldProps("excerpt")}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Brief description of the blog post..."
                  />
                  {formik.touched.excerpt && formik.errors.excerpt && <p className="mt-1 text-sm text-red-600">{formik.errors.excerpt}</p>}
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Content *</h2>
              <div className={`quill-field-wrapper rounded-md border px-3 py-2 min-h-[180px] bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-colors duration-200 ${formik.touched.content && formik.errors.content ? "border-red-500 dark:border-red-500" : ""}`}>
                <QuillField value={formik.values.content} onChange={(val) => formik.setFieldValue("content", val)} />
              </div>
              {formik.touched.content && formik.errors.content && <p className="mt-1 text-sm text-red-600">{formik.errors.content}</p>}
            </motion.div>

            {/* SEO */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">SEO Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Title</label>
                  <input type="text" {...formik.getFieldProps("metaTitle")} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="SEO optimized title..." />
                  {formik.touched.metaTitle && formik.errors.metaTitle && <p className="mt-1 text-sm text-red-600">{formik.errors.metaTitle}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Description</label>
                  <textarea {...formik.getFieldProps("metaDescription")} rows={3} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="SEO meta description..." />
                  {formik.touched.metaDescription && formik.errors.metaDescription && <p className="mt-1 text-sm text-red-600">{formik.errors.metaDescription}</p>}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><Calendar className="w-5 h-5 mr-2 text-[#005c82]" /> Publish Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status *</label>
                  <select {...formik.getFieldProps("status")} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Author</label>
                  <input type="text" {...formik.getFieldProps("author")} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Author name..." />
                  {formik.touched.author && formik.errors.author && <p className="mt-1 text-sm text-red-600">{formik.errors.author}</p>}
                </div>
              </div>
            </motion.div>

            {/* Categories & Tags */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><Tag className="w-5 h-5 mr-2 text-[#005c82]" /> Categories & Tags</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
                  <select {...formik.getFieldProps("category")} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" disabled={categoriesLoading}>
                    <option value="">Select Category</option>
                    {categoriesLoading && <option value="" disabled>Loading categories...</option>}
                    {categoriesError && <option value="" disabled>{categoriesError}</option>}
                    {!categoriesLoading && !categoriesError && categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                  </select>
                  {formik.touched.category && formik.errors.category && <p className="mt-1 text-sm text-red-600">{formik.errors.category}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags * (comma separated)</label>
                  <input type="text" {...formik.getFieldProps("tags")} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="tag1, tag2, tag3" />
                  {formik.touched.tags && formik.errors.tags && <p className="mt-1 text-sm text-red-600">{formik.errors.tags}</p>}
                </div>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><Upload className="w-5 h-5 mr-2 text-[#005c82]" /> Featured Image</h3>
              {featuredImagePreview ? (
                <div className="relative">
                  <img src={featuredImagePreview} alt="Featured" className="w-full h-32 object-cover rounded-lg" />
                  <Button type="button" variant="destructive" size="sm" className="absolute top-2 right-2" onClick={handleRemoveImage}><X className="h-3 w-3" /></Button>
                </div>
              ) : (
                <div className={`border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center bg-white dark:bg-gray-900 transition-colors duration-150 ${dragActive ? "border-blue-400 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30" : ""}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={handleChooseImageClick} style={{ cursor: "pointer" }}>
                  <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
                  <ImageIcon className="h-8 w-8 mx-auto text-gray-400 dark:text-gray-500 mb-2 pointer-events-none" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 pointer-events-none">{dragActive ? "Drop image here..." : "Upload featured image"}</p>
                  <Button type="button" variant="outline" size="sm" className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white pointer-events-none" tabIndex={-1}><Upload className="h-4 w-4 mr-2" /> Choose Image</Button>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 pointer-events-none">Drag & drop or click to select</p>
                  {formik.errors.featuredImage && <p className="mt-1 text-sm text-red-600">{formik.errors.featuredImage}</p>}
                </div>
              )}
            </motion.div>

            {/* Options */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Options</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" {...formik.getFieldProps("allowComments")} checked={formik.values.allowComments} className="w-4 h-4 text-[#005c82] border-gray-300 rounded focus:ring-[#005c82]" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Allow Comments</span>
                </label>

                <label className="flex items-center">
                  <input type="checkbox" {...formik.getFieldProps("isFeatured")} checked={formik.values.isFeatured} className="w-4 h-4 text-[#005c82] border-gray-300 rounded focus:ring-[#005c82]" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Featured Post</span>
                </label>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="space-y-3">
              <button type="submit" disabled={formik.isSubmitting} className="w-full bg-gradient-to-r from-[#005c82] to-[#00dbed] text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center">
                <Save className="w-5 h-5 mr-2" /> {formik.isSubmitting ? "Saving..." : "Save Blog Post"}
              </button>
              <button type="button" className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center">
                <Eye className="w-5 h-5 mr-2" /> Preview
              </button>
            </motion.div>
          </div>
        </div>
      </form>
    </motion.div>
  )
}
