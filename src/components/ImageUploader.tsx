import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface ImageUploaderProps {
  onImageUpload: (imageType: string, imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const objectTypes = [
    { id: 'player', label: 'Chef Character' },
    { id: 'baby', label: 'Baby Character' },
    { id: 'dustpan', label: 'Dustpan Goal' },
    { id: 'dust', label: 'Dust Pile' },
    { id: 'island', label: 'Kitchen Island' },
    { id: 'fridge', label: 'Refrigerator' },
    { id: 'stool', label: 'Bar Stool' }
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedType && previewUrl) {
      onImageUpload(selectedType, previewUrl);
      setPreviewUrl('');
      setSelectedType('');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Upload Custom Images</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="object-type">Select Object Type</Label>
          <select
            id="object-type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Choose an object...</option>
            {objectTypes.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <Label htmlFor="image-file">Upload Image</Label>
          <Input
            id="image-file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        
        {previewUrl && (
          <div className="text-center">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full h-32 object-contain mx-auto border rounded"
            />
          </div>
        )}
        
        <Button
          onClick={handleUpload}
          disabled={!selectedType || !previewUrl}
          className="w-full"
        >
          Apply Image
        </Button>
      </CardContent>
    </Card>
  );
};

export default ImageUploader;