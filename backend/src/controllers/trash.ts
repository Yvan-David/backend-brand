/* export const create = async (req: express.Request, res: express.Response) => {
    try {
       let image = null;

       
       const {title, body} = req.body;

       if (!title || !body){
           return res.status(400);
       }

       const existingBlog = await getBlogByTitle(title);

        if (existingBlog) {
            return res.sendStatus(400)
        }
  
       console.log("========>>>>>>>>", req.file)
        if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path);
          console.log("========>>>>>>>>+++++", result)
          image = result ? result.secure_url : null;

          if (image) {

          const blog = await createBlog({
            title,
            body,
            image
        });

        return res.status(200).json(blog).end();
    }
        }
        else {
            return res.status(400).json({message: "error uploading image!!"});
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "failed to create blog"});
    }
}
 */