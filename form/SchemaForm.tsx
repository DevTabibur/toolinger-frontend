import { Button } from "@/components/ui/button"
import { ErrorMessage, Field } from "formik"
import { motion } from "framer-motion"
import { Globe, ImageIcon, Upload, X } from "lucide-react"
import React, { useRef } from "react"

const SchemaForm = ({ itemVariants,
    values, }: any) => {
    return (
        <>
            <motion.div variants={itemVariants} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Schema Markup (JSON-LD, array or object)
                    </label>
                    <Field
                        as="textarea"
                        name="schemas"
                        rows={12}
                        placeholder={`[
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Toolinger",
    "url": "https://toolinger.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://toolinger.com/search?query={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
]`}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                    />
                    <ErrorMessage name="schemas" component="div" className="text-red-500 text-sm mt-1" />
                </div>
            </motion.div></>
    )
}


export default SchemaForm