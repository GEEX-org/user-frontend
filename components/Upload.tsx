"use client";
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { UploadImage } from "@/components/UploadImage";
import { BACKEND_URL } from "@/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { motion } from "framer-motion"; // Import Framer Motion

export const Upload = () => {
    const [images, setImages] = useState<string[]>([]);
    const [title, setTitle] = useState("");
    const [txSignature, setTxSignature] = useState("");
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const router = useRouter();

    async function onSubmit() {
        const response = await axios.post(`${BACKEND_URL}/v1/user/task`, {
            options: images.map(image => ({
                imageUrl: image,
            })),
            title,
            signature: txSignature
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });

        router.push(`/task/${response.data.id}`);
    }

    async function makePayment() {
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey!,
                toPubkey: new PublicKey("5vrRuAhK2TthC9HrXwRaxLPNw88xe9dfe4SwReDQPQmB"),
                lamports: 100000000,
            })
        );

        const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight }
        } = await connection.getLatestBlockhashAndContext();

        const signature = await sendTransaction(transaction, connection, { minContextSlot });

        await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
        setTxSignature(signature);
    }

    return (
        <motion.div
            initial={{ opacity: 90, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center h-[50vh] text-white bg-black px-4 md:px-0"
        >
            <div className="max-w-screen-lg w-full">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-2xl text-left pt-20 w-full text-purple-400"
                >
                    Create Tasks
                </motion.div>

                <motion.label className="block mt-2 text-md font-medium text-purple-300" 
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}>
                    Task details
                </motion.label>
                <motion.input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="mt-1 bg-purple-100 border-3 border-purple-300 text-purple-600 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                    placeholder="What is your task?"
                    required
                    whileFocus={{ scale: 1.0 }}
                />

                <div className='flex flex-wrap gap-5 mb-5'>
                    <motion.label
                        className="block mt-8 text-md font-medium text-purple-300 cursor-pointer"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        whileHover={{ scale: 1.05, fontWeight: "bold", color: "#7E22CE" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Add Images
                    </motion.label>
                    <div className="flex justify-center pt-4 max-w-screen-lg flex-wrap gap-2">
                        {images.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <UploadImage image={image} onImageAdded={(imageUrl) => setImages(i => [...i, imageUrl])} />
                            </motion.div>
                        ))}
                    </div>

                    <motion.label
                        className="block mt-8 text-md font-medium text-purple-300 cursor-pointer"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        whileHover={{ scale: 1.05, fontWeight: "bold", color: "#7E22CE" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Add Texts
                    </motion.label>

                    <motion.label
                        className="block mt-8 text-md font-medium text-purple-300 cursor-pointer"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        whileHover={{ scale: 1.05, fontWeight: "bold", color: "#7E22CE" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Add Videos
                    </motion.label>

                    <div className="flex justify-center pt-4 max-w-screen-lg flex-wrap gap-2">
                        {images.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <UploadImage image={image} onImageAdded={(imageUrl) => setImages(i => [...i, imageUrl])} />
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="pt-2 flex justify-center">
                    <UploadImage onImageAdded={(imageUrl) => setImages(i => [...i, imageUrl])} />
                </div>

                <div className="flex justify-center">
                    <motion.button
                        onClick={txSignature ? onSubmit : makePayment}
                        type="button"
                        className="mt-6 text-white bg-purple-600 border-2 border-purple-400 hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mb-2"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {txSignature ? "Submit Task" : "Pay 0.1 SOL"}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};
