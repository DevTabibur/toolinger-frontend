import { Metadata } from "next";
import DetectCMSClient from "../ClientPage/DetectCMSClient";

import { getDynamicPagesArticleAndSeoBySlug } from "@/app/api/pageManagement.Api";




export default function DetectCMS(props: { article?: any, seo?: any }) {
    const { article, seo } = props;
    return (
        <>
            <DetectCMSClient />
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* First column: col-span-7 on md+ */}
                    <div className="md:col-span-7 col-span-1 ">
                        <div className="border-t border-gray-200 dark:border-gray-700">
                            {props?.article && (
                                <div
                                    className="prose max-w-none mt-8 "
                                    dangerouslySetInnerHTML={{ __html: props?.article || ""}}
                                />
                            )}
                        </div>
                    </div>
                    {/* Second column: col-span-5 on md+ */}
                    <div className="md:col-span-5 col-span-1 ">
                        {/* You can place content for the second column here */}
                        {/* Advertiesment */}
                    </div>
                </div>
            </div>
        </>
    );
}
