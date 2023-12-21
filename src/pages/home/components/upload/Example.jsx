import { useState } from "react";

import imageCompression from "browser-image-compression";



function Example() {

  const [origImage, setOrigImage] = useState("");

  const [origImageFile, setOrigImageFile] = useState("");

  const [compressedImage, setCompressedImage] = useState("");

  const [fileName, setFileName] = useState("");



  const handle = (e) => {

    const imageFile = e.target.files[0];

    setOrigImage(imageFile);

    setOrigImageFile(URL.createObjectURL(imageFile));

    setFileName(imageFile.name);

  };



  const handleCompressImage = (e) => {

    e.preventDefault();



    const options = {

      maxSizeMB: 1,

      maxWidthOrHeight: 500,

      useWebWorker: true,

    };



    if (options.maxSizeMB >= origImage / 1024) {

      alert("Image is too small, cant be compressed");

      return 0;

    }



    let output;

    imageCompression(origImage, options).then((x) => {

      output = x;



      const downloadLink = URL.createObjectURL(output);

      setCompressedImage(downloadLink);

    });

  };

  return (

    <div className="App">

      <h1></h1>

      <section>

        <div>

          <div >

            <div>

              {origImageFile ? (

                <img src={origImageFile}></img>

              ) : ""}

            </div>

          </div>

          <div>

            <input

              type="file"

              accept="image/*"

              className="mt-2 btn btn-dark w-75"

              onChange={(e) => handle(e)}

            />

            <h1></h1>

            {origImageFile && (

              <button

            

                onClick={(e) => {

                  handleCompressImage(e);

                }}

              >

                {" "}

                Compress Image

              </button>

            )}

            <h1></h1>

            {compressedImage && (

              <button>

                <a href={compressedImage} download={fileName}>

                  {" "}

                  Download Image

                </a>

              </button>

            )}

          </div>

          <div>

            <div>

              {compressedImage ? (

                <img src={compressedImage} />

              ) : ""}

            </div>

          </div>

        </div>

      </section>

    </div>

  );

}



export default Example;

