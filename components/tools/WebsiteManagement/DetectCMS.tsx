import { Metadata } from "next";
import DetectCMSClient from "../ClientPage/DetectCMSClient";

import { getDynamicPagesArticleAndSeoBySlug } from "@/app/api/pageManagement.Api";




export default function DetectCMS(props: { article?: any, seo?: any }) {
    const { article, seo } = props;
    return (
        <>
            <DetectCMSClient />
           
        </>
    );
}
