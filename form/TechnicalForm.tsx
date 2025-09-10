import { Button } from "@/components/ui/button"
import { ErrorMessage, Field } from "formik"
import { motion } from "framer-motion"
import { Globe, ImageIcon, Upload, X } from "lucide-react"
import React, { useRef } from "react"

const TechnicalForm = ({ itemVariants,
    values, }: any) => {
    return (
        <>
            <motion.div variants={itemVariants} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Changefreq
                        </label>
                        <Field
                            as="select"
                            name="changefreq"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </Field>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Priority (0.0 - 1.0)
                        </label>
                        <Field
                            name="priority"
                            type="number"
                            min={0}
                            max={1}
                            step={0.1}
                            placeholder="1.0"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#005c82] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                </div>
            </motion.div>
        </>
    )
}






export default TechnicalForm