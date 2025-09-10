import { ErrorMessage, Field } from "formik"
import { motion } from "framer-motion"



const BasicSEOForm = ({ itemVariants, values }: any) => {
    return (
        <motion.div variants={itemVariants} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Meta Title * (10-60 characters)
                    </label>
                    <Field
                        name="metaTitle"
                        type="text"
                        placeholder="Enter meta title"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <div className="flex justify-between text-xs mt-1">
                        <ErrorMessage name="metaTitle" component="span" className="text-red-500" />
                        <span className={`${values.metaTitle.length > 60 ? "text-red-500" : "text-gray-500"}`}>
                            {values.metaTitle.length}/60
                        </span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Noindex
                    </label>
                    <Field
                        as="select"
                        name="noindex"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="false">Index (default)</option>
                        <option value="true">Noindex</option>
                    </Field>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Keywords * (Comma separated)
                    </label>
                    <Field
                        name="keywords"
                        type="text"
                        placeholder="keyword1, keyword2, keyword3, long-tail keyword"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <ErrorMessage name="keywords" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Canonical URL
                    </label>
                    <Field
                        name="canonicalUrl"
                        type="url"
                        placeholder="https://toolinger.com/page"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <ErrorMessage name="canonicalUrl" component="div" className="text-red-500 text-sm mt-1" />
                </div>
            </div>



            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meta Description * (30-160 characters)
                </label>
                <Field
                    as="textarea"
                    name="metaDescription"
                    rows={3}
                    placeholder="Compelling description that includes your focus keyword and encourages clicks"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <div className="flex justify-between text-xs mt-1">
                    <ErrorMessage name="metaDescription" component="span" className="text-red-500" />
                    <span className={`${values.metaDescription.length > 160 ? "text-red-500" : "text-gray-500"}`}>
                        {values.metaDescription.length}/160
                    </span>
                </div>
            </div>
        </motion.div>
    )
}
export default BasicSEOForm