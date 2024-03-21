import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'ddf0u9tgz', 
  api_key: '144849361932884', 
  api_secret: 'AOqmdtBz9m0XnqBm13qzK1cbFBg' 
});

/* export const isValidEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    return emailRegex.test(email);
  }; */
  export {cloudinary};
