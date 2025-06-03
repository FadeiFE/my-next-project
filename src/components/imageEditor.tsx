import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import { getCroppedImg } from '@/utils/cropUtils';
import type { Point, Area } from 'react-easy-crop';

interface AvatarEditorProps {
  imageSrc: string;
  onSave: (croppedBlob: Blob) => void;
}
export default function AvatarEditor({ imageSrc, onSave }: AvatarEditorProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (croppedAreaPixels !== null) {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onSave(croppedImage);
    }
  };

  return (
    <div>
      <div style={{ marginTop: 20 }}>
        <Slider value={zoom} min={1} max={3} step={0.1} onChange={(e, z) => setZoom(z as number)} />
        <button onClick={handleSave}>Сохранить</button>
      </div>
      <div style={{ position: 'relative', width: '100%', height: 400 }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          showGrid={false}
          cropShape="round"
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>
    </div>
  );
}
