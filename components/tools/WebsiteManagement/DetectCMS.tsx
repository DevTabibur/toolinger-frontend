import { Metadata } from "next";
import DetectCMSClient from "../ClientPage/DetectCMSClient";

import { getDynamicPagesArticleAndSeoBySlug } from "@/app/api/pageManagement.Api";




export default function DetectCMS() {

    return (
        <>
            <DetectCMSClient />
           
        </>
    );
}
