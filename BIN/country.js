

  //individual fields update
  //const res=await Country.updateMany({_id:id},{$set:{ Comments:["Sales Tax"]}})

  //changing particular value inside array
//   const res=await connection.connection.db.collection("countries").updateMany(
    
//     {Comments:"Sales Tax"},
//     {$set:{"Comments.$":"Public Speaking"}}
//  )

//pushn into arrray
// const res=await Country.updateOne(
//   { _id: id },
//   { $push: { Comments: 89 } }
//   )


//below command without each add array and with each will add as individual elements
//   const res=await Country.updateMany(
//     { _id: id },
//     { $push: { Comments: { $each: [ 90, 92, 85 ] } } }
//     )


//   console.log("res",res)
//   return response.json({ message: "Topic updated" }, { status: 200 });
// }

// else if (request.method==="POST"){


  

  const data = await new Promise((resolve, reject) => {
    const form = new Formidable();

    form.parse(request, (err, fields, files) => {
      if (err) reject({ err })
      resolve({ err, fields, files })
    }) 
  })

  console.log("data",data)

  const publicFolderPath = path.join(process.cwd(), 'public', "images");
      
  let responseData;

        // Check if an image file was uploaded
        if (data.files.Image1) {
            const oldPath = data.files.Image1[0].filepath;
            const file = fs.readFileSync(oldPath)
            const blob = Buffer.from(file).toString('base64')
            console.log("blob",blob)

            const res=await Country.create({
              "Name":"Menjith",
              "Image":"singam.jpg",
              "Comments":[]
            })
            console.log("ressssssssss",res)
            return response.json({ message: res }, { status: 201 });

            // const newFileName = data.files.Image1[0].originalFilename;
            // const newPath = path.join(publicFolderPath, newFileName);

            // try {
            //     // Copy the uploaded image to the designated path
            //     await fs.promises.copyFile(oldPath, newPath);
            //     console.log('File copied to:', newPath);
            //     console.log('File uploaded and renamed:', newFileName);

            //     // Create an object with form data
            //     const formData = {
            //         body: data.fields.body[1],
            //         image: newFileName,
            //     };

            //     // Create a new post entry in the mongodb database
            //     // try {
            //     //     const post = await Post.create(formData);
            //     //     responseData = post;
            //     // } catch (err) {
            //     //     console.log(err.message);
            //     // }
            //     response.status(500).json({ "mongoose": formData,data:data });

            // } catch (error) {
            //     console.log('Error renaming/moving file:', error);
            //     response.status(500).json({ error: 'Error processing uploaded file.',data:data });
            //     return;
            // }
        } 
        
        else {
            responseData = data;
        }

        // Respond with the processed data
        response.status(200).json(responseData);
 
}
}