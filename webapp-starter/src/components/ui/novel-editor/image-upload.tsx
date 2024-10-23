import { uploadFile } from '@/features/files/services/file.service';
import { getFileUrl } from '@/helpers/get-file-url';
import { createImageUpload } from 'novel/plugins';
import { toast } from 'sonner';

const onUpload = (file: File) => {
  const formData = new FormData();
  if (file) {
    formData.append('files', file, file.name);
  }

  const promise = uploadFile(formData);

  return new Promise((resolve, reject) => {
    toast.promise(
      promise.then(async (res) => {
        // Successfully uploaded image
        if (res && !res.error) {
          const image = new Image();
          image.src = getFileUrl(res.files[0]);
          image.onload = () => {
            resolve(getFileUrl(res.files[0]));
          };
        } else {
          throw new Error('Error uploading image. Please try again.');
        }
      }),
      {
        loading: 'Uploading image...',
        success: 'Image uploaded successfully.',
        error: (e) => {
          reject(e);
          return e?.message;
        },
      },
    );
  });
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes('image/')) {
      toast.error('File type not supported.');
      return false;
    }
    if (file.size / 1024 / 1024 > 20) {
      toast.error('File size too big (max 20MB).');
      return false;
    }
    return true;
  },
});
