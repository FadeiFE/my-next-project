'use client';

import ImageEditor from '@/components/imageEditor';
import React, { useState } from 'react';

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDownload = async (file: Blob) => {
    const blob = file;

    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'avatar.png'; // имя файла
    a.click();
    URL.revokeObjectURL(url); // очистка памяти
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imageSrc && <ImageEditor imageSrc={imageSrc} onSave={handleDownload} />}
    </div>
  );
}
