import React, {
  FunctionComponent,
  useState,
  useContext,
  useEffect,
} from "react";
import firebase from "firebase";

/* Components */
import { Upload, message } from "antd";
import UilImageUpload from "@iconscout/react-unicons/icons/uil-camera-plus";
import ImgCrop from "antd-img-crop";

/* Store */
import { Context } from "../../store/Store";

/* Styles */
import "./_cover-photo.scss";

export const CoverPhoto: FunctionComponent = () => {
  const [image, setImage] = useState<string | null>(null);
  const [context] = useContext(Context);
  const ASPECT_RATIO = 12 / 6;

  useEffect(() => {
    async function init() {
      try {
        const storage = firebase.storage();
        const storageRef = await storage.ref(`${context.user.uid}/temp/`);
        const imgRef = storageRef.child(`temp-cover-photo.png`);
        await imgRef.delete();
      } catch (err) {}
    }
    init();
  }, []);

  function beforeUpload(file) {
    const isImage = file.type.indexOf("image/") === 0;
    if (!isImage) {
      message.error("You can only upload image file");
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Image must smaller than 5MB");
    }
    return isImage && isLt5M;
  }

  async function uploadPhoto({ onError, onSuccess, file }) {
    const storage = firebase.storage();
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = await storage.ref(`${context.user.uid}/temp/`);
    const imgRef = storageRef.child(`temp-cover-photo.png`);
    try {
      const image = await imgRef.put(file, metadata);
      const url = await imgRef.getDownloadURL();
      setImage(url);
      onSuccess(null, image);
    } catch (err) {
      message.error("Failed to upload");
      onError(err);
    }
  }
  return (
    <div id="ea-cover-photo">
      <ImgCrop rotate aspect={ASPECT_RATIO}>
        <Upload
          beforeUpload={beforeUpload}
          customRequest={uploadPhoto}
          showUploadList={false}
        >
          {image ? (
            <div className="cover-photo">
              <div className="cover-photo__hover">
                <div className="cover-photo__hover__backdrop"></div>
                <div className="cover-photo__hover__text">
                  <UilImageUpload size={32} /> Edit
                </div>
              </div>
              <img className="cover-photo__image" src={image} alt="img"></img>
            </div>
          ) : (
            <div className="placeholder">
              <UilImageUpload size={64} color="#c0bfbf" /> UPLOAD
            </div>
          )}
        </Upload>
      </ImgCrop>
    </div>
  );
};
