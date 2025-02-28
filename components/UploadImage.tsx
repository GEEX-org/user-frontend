// "use client"
// import { BACKEND_URL, CLOUDFRONT_URL } from "@/utils";
// import axios from "axios";
// import { useState } from "react"

// export function UploadImage({ onImageAdded, image }: {
//     onImageAdded: (image: string) => void;
//     image?: string;
// }) {
//     const [uploading, setUploading] = useState(false);

//     async function onFileSelect(e: any) {
//         setUploading(true);
//         try {
//             const file = e.target.files[0];
//             const response = await axios.get(`${BACKEND_URL}/v1/user/presignedUrl`, {
//                 headers: {
//                     "Authorization": localStorage.getItem("token")
//                 }
//             });
//             const presignedUrl = response.data.preSignedUrl;
//             const formData = new FormData();
//             formData.set("bucket", response.data.fields["bucket"])
//             formData.set("X-Amz-Algorithm", response.data.fields["X-Amz-Algorithm"]);
//             formData.set("X-Amz-Credential", response.data.fields["X-Amz-Credential"]);
//             formData.set("X-Amz-Algorithm", response.data.fields["X-Amz-Algorithm"]);
//             formData.set("X-Amz-Date", response.data.fields["X-Amz-Date"]);
//             formData.set("key", response.data.fields["key"]);
//             formData.set("Policy", response.data.fields["Policy"]);
//             formData.set("X-Amz-Signature", response.data.fields["X-Amz-Signature"]);
//             formData.set("X-Amz-Algorithm", response.data.fields["X-Amz-Algorithm"]);
//             formData.append("file", file);
//             const awsResponse = await axios.post(presignedUrl, formData);
            
//             onImageAdded(`${CLOUDFRONT_URL}/${response.data.fields["key"]}`);
//         } catch(e) {
//             console.log(e)
//         }
//         setUploading(false);
//     }

//     if (image) {
//         return <img className={"p-2 w-96 rounded"} src={image} />
//     }

//     return <div>
//         <div className="w-40 h-40 rounded border text-2xl cursor-pointer border-purple-500">
//                 <div className="h-full flex justify-center flex-col relative w-full">
//                     <div className="h-full flex justify-center w-full pt-16 text-4xl">
//                     {uploading ? <div className="text-sm">Loading...</div> : <>
//                         +
//                         <input className="w-full h-full bg-red-400 " type="file" style={{position: "absolute", opacity: 0, top: 0, left: 0, bottom: 0, right: 0, width: "100%", height: "100%"}} onChange={onFileSelect} />
//                     </>}
//                 </div>
//             </div>
//         </div>
//     </div>
// }

"use client";
import { BACKEND_URL, CLOUDFRONT_URL } from "@/utils";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion

export function UploadImage({ onImageAdded, image }: { onImageAdded: (image: string) => void; image?: string }) {
    const [uploading, setUploading] = useState(false);

    async function onFileSelect(e: any) {
        setUploading(true);
        try {
            const file = e.target.files[0];
            const response = await axios.get(`${BACKEND_URL}/v1/user/presignedUrl`, {
                headers: { "Authorization": localStorage.getItem("token") }
            });

            const presignedUrl = response.data.preSignedUrl;
            const formData = new FormData();
            formData.set("bucket", response.data.fields["bucket"]);
            formData.set("X-Amz-Algorithm", response.data.fields["X-Amz-Algorithm"]);
            formData.set("X-Amz-Credential", response.data.fields["X-Amz-Credential"]);
            formData.set("X-Amz-Date", response.data.fields["X-Amz-Date"]);
            formData.set("key", response.data.fields["key"]);
            formData.set("Policy", response.data.fields["Policy"]);
            formData.set("X-Amz-Signature", response.data.fields["X-Amz-Signature"]);
            formData.append("file", file);

            await axios.post(presignedUrl, formData);
            onImageAdded(`${CLOUDFRONT_URL}/${response.data.fields["key"]}`);
        } catch (e) {
            console.log(e);
        }
        setUploading(false);
    }

    if (image) {
        return (
            <motion.img
                className="p-2 w-96 rounded"
                src={image}
                alt="Uploaded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            />
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <motion.div
                className="w-40 h-40 rounded border text-2xl cursor-pointer border-purple-500 flex items-center justify-center relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {uploading ? (
                    <motion.div
                        className="text-sm"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                        ⏳ Uploading...
                    </motion.div>
                ) : (
                    <>
                        <motion.div
                            className="text-4xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            +
                        </motion.div>
                        <input
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            type="file"
                            onChange={onFileSelect}
                        />
                    </>
                )}
            </motion.div>
        </motion.div>
    );
}
