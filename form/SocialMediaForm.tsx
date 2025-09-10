import { Button } from "@/components/ui/button"
import { ErrorMessage, Field } from "formik"
import { motion } from "framer-motion"
import { Globe, ImageIcon, Upload, X } from "lucide-react"
import React, { useRef } from "react"

const SocialMediaForm = ({
    itemVariants,
    values,
    ogImage,
    setOgImage,
    ogImagePreview,
    setOgImagePreview,

    setOgImageError,
    dragActive,
    fileInputRef,
    handleChooseImageClick,
    handleRemoveImage,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop
}: {
    itemVariants: any,
    values: any,
    ogImage: any,
    setOgImage: any,
    ogImagePreview: any,
    setOgImagePreview: any,

    setOgImageError: any,
    dragActive: any,
    fileInputRef: any,
    handleChooseImageClick: any,
    handleRemoveImage: any,
    handleFileChange: any,
    handleDragOver: any,
    handleDragLeave: any,
    handleDrop: any,
}) => {




    return (
        <>
            <motion.div variants={itemVariants} className="space-y-6">
                {/* Open Graph */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <Globe className="w-5 h-5 mr-2 text-[#005c82] dark:text-[#00dbed]" />
                        Open Graph (Facebook, LinkedIn)
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                OG Title
                            </label>
                            <Field
                                name="ogTitle"
                                type="text"
                                placeholder="Facebook/LinkedIn share title"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <ErrorMessage name="ogTitle" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                OG Type
                            </label>
                            <Field
                                as="select"
                                name="ogType"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="website">Website</option>
                                <option value="article">Article</option>
                                <option value="product">Product</option>
                                <option value="profile">Profile</option>
                            </Field>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Site Name
                            </label>
                            <Field
                                name="ogSiteName"
                                type="text"
                                placeholder="Toolinger"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Locale
                            </label>
                            <Field
                                as="select"
                                name="ogLocale"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="en_US">English (US)</option>
                                <option value="en_GB">English (UK)</option>
                                <option value="es_ES">Spanish</option>
                                <option value="fr_FR">French</option>
                                <option value="de_DE">German</option>
                            </Field>
                        </div>
                    </div>

                    {/* OG Image Upload */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            OG Image (1200x630px recommended)
                        </label>
                        {ogImagePreview ? (
                            <div className="relative">
                                <img
                                    src={ogImagePreview || "/placeholder.svg"}
                                    alt="OG"
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={handleRemoveImage}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        ) : (
                            <div
                                className={`border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center bg-white dark:bg-gray-900 transition-colors duration-150 ${dragActive ? "border-blue-400 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30" : ""}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={handleChooseImageClick}
                                style={{ cursor: "pointer" }}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                                <ImageIcon className="h-8 w-8 mx-auto text-gray-400 dark:text-gray-500 mb-2 pointer-events-none" />
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 pointer-events-none">
                                    {dragActive ? "Drop image here..." : "Upload OG image"}
                                </p>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white pointer-events-none"
                                    tabIndex={-1}
                                >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Choose Image
                                </Button>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 pointer-events-none">Drag & drop or click to select</p>
                            </div>
                        )}
                        <ErrorMessage name="featuredImage" component="div" className="text-red-500 dark:text-red-400 text-sm mt-1" />
                        {/* {featuredImageError && (
                          <div className="text-red-500 dark:text-red-400 text-sm mt-1">{featuredImageError}</div>
                        )} */}
                        <ErrorMessage name="ogImage" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            OG Description
                        </label>
                        <Field
                            as="textarea"
                            name="ogDescription"
                            rows={2}
                            placeholder="Description for social media shares"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <ErrorMessage name="ogDescription" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                </div>

                {/* Twitter Cards */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Twitter Cards</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Card Type
                            </label>
                            <Field
                                as="select"
                                name="twitterCard"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="summary">Summary</option>
                                <option value="summary_large_image">Summary Large Image</option>
                                <option value="app">App</option>
                                <option value="player">Player</option>
                            </Field>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Twitter Site Handle
                            </label>
                            <Field
                                name="twitterSite"
                                type="text"
                                placeholder="@toolinger"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Twitter Creator Handle
                            </label>
                            <Field
                                name="twitterCreator"
                                type="text"
                                placeholder="@creator_handle"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Twitter Image URL
                            </label>
                            <Field
                                name="twitterImageUrl"
                                type="url"
                                placeholder="https://toolinger.com/images/twitter-card.jpg"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <ErrorMessage name="twitterImageUrl" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default SocialMediaForm

/**
 * SUGGESTION for parent usage:
 * 
 * In your parent component (the Formik form), you should:
 * 
 * 1. Add a state for the OG image file:
 *    const [ogImageFile, setOgImageFile] = useState<File | null>(null);
 * 
 * 2. Pass ogImageFile, setOgImageFile, and setFieldValue from Formik to SocialMediaForm:
 *    <SocialMediaForm
 *      itemVariants={itemVariants}
 *      values={values}
 *      ogImageFile={ogImageFile}
 *      setOgImageFile={setOgImageFile}
 *      setFieldValue={setFieldValue}
 *    />
 * 
 * 3. In your handleSubmit, you can access ogImageFile and log its data:
 *    const handleSubmit = (values) => {
 *      console.log("OG Image File:", ogImageFile);
 *      // You can access file name, type, size, etc.
 *      if (ogImageFile) {
 *        console.log("File name:", ogImageFile.name);
 *        console.log("File type:", ogImageFile.type);
 *        console.log("File size:", ogImageFile.size);
 *        // You can also upload the file here if needed
 *      }
 *      // ...rest of your submit logic
 *    }
 * 
 * This approach keeps the image file in the parent, so you can use it in handleSubmit.
 */