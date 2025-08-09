"use client"
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import axios from "axios";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";


const LinkPriceCalculator = () => {
    const { theme } = useTheme();
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);

    const formik = useFormik({
        initialValues: {
            urls: "",
        },
        validationSchema: Yup.object({
            urls: Yup.string()
                .required("Please enter URLs")
                .test("max-urls", "Enter up to 100 URLs", (value) => {
                    if (!value) return false;
                    const urls = value.split("\n");
                    return urls.length <= 100;
                }),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const response = await axios.post("/api/calculate-link-price", {
                    urls: values.urls.split("\n"),
                });
                setResults(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <>
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center space-x-2 text-sm">
                    <Link href="/" className="text-muted-foreground hover:text-primary flex items-center">
                        <Home className="h-4 w-4 mr-1" />
                        Home
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <Link href="/category/calculators" className="text-muted-foreground hover:text-primary">
                        Calculator Tools
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">Link Price Calculator</span>
                </nav>
            </div>

            <div className={`container mx-auto ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>

                <div className={`p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className="text-2xl font-bold mb-4">Link Price Calculator</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <textarea
                            name="urls"
                            rows={10}
                            className={`w-full p-2 border rounded mb-4 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                            placeholder="Enter up to 100 URLs. Each URL must be on a separate line."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.urls}
                        />
                        {formik.touched.urls && formik.errors.urls ? (
                            <div className="text-red-500 mb-4">{formik.errors.urls}</div>
                        ) : null}
                        <button
                            type="submit"
                            className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-500' : 'bg-gradient-to-r from-blue-500 to-green-500'}`}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Submit"}
                        </button>
                    </form>

                    {results.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mt-6"
                        >
                            <table className={`min-w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                                <thead>
                                    <tr>
                                        <th className="py-2">ID No.</th>
                                        <th className="py-2">URL</th>
                                        <th className="py-2">Approximate Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((result, index) => (
                                        <tr key={index} className="border-t">
                                            <td className="py-2">{index + 1}</td>
                                            <td className="py-2">{(result as any).url}</td>
                                            <td className="py-2">{(result as any).price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
};

export default LinkPriceCalculator;
