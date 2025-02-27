"use client";
import { Appbar } from "@/components/Appbar";
import { Hero } from "@/components/Hero";
import { Upload } from "@/components/Upload";
import { UploadImage } from "@/components/UploadImage";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  return (
    <main style={{ backgroundColor: '#f0e1d2' }}>
      <Appbar />
      <Hero />
      <Upload />
    </main>
  );
}
