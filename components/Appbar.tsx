"use client";
import {
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/utils';
import { motion } from 'framer-motion';

export const Appbar = () => {
    const { publicKey, signMessage } = useWallet();
    const [opacity, setOpacity] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [walletSelected, setWalletSelected] = useState(false);

    async function signAndSend() {
        if (!publicKey) {
            return;
        }
        setWalletSelected(true); // Mark wallet as selected
        const message = new TextEncoder().encode("Sign into mechanical turks");
        const signature = await signMessage?.(message);
        
        const response = await axios.post(`${BACKEND_URL}/v1/user/signin`, {
            signature,
            publicKey: publicKey?.toString()
        });

        localStorage.setItem("token", response.data.token);
    }

    useEffect(() => {
        if (publicKey) signAndSend();
    }, [publicKey]);

    useEffect(() => {
        const handleScroll = () => {
            setOpacity(window.scrollY > 50 ? 0.85 : 1);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.div 
            className="fixed top-0 left-0 w-full flex items-center justify-between border-b border-purple-600
                        bg-black text-purple-300 py-3 px-4 md:px-8 transition-opacity duration-300 h-[12vh] z-50"
            style={{ opacity }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {/* Left: Logo */}
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
                Defi-Tasker
            </div>

            {/* Desktop & Tablet Wallet Button */}
            <div className="hidden md:flex text-lg">
                {walletSelected || publicKey ? (
                    <WalletDisconnectButton />
                ) : (
                    <div className="cursor-pointer px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-black hover:border-purple-400 hover:border transition "
                        onClick={() => setWalletSelected(true)}>
                        Select Wallet
                    </div>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button 
                    className="text-purple-400 hover:text-purple-500 transition-transform duration-300"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? "✖" : "☰"}
                </button>
            </div>

            {/* Mobile Menu (Dropdown) */}
            {isMobileMenuOpen && (
                <motion.div 
                    className="absolute top-[12vh] left-0 w-full bg-black border-t border-purple-600 p-4 flex flex-col items-center space-y-3 md:hidden"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {walletSelected || publicKey ? (
                        <WalletDisconnectButton />
                    ) : (
                        <div className="cursor-pointer px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition"
                            onClick={() => setWalletSelected(true)}>
                            Select Wallet
                        </div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
};

