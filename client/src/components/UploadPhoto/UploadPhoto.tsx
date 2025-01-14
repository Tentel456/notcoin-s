import React, {FC, useState} from 'react';
import {fetchData, fetchDataAxios} from "../../utils/api";
import './UploadPhoto.css';
import Img from "../Img/Img";
import {useTranslation} from "react-i18next";

interface UploadPhotoProps {
    onUpload: (filename: any) => void
}

const UploadPhoto: FC<UploadPhotoProps> = ({ onUpload }) => {

    const [imageSrc, setImageSrc] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation();

    const openUploadFile = () => {
        const element = document.getElementById('file');
        if (!element) {
            console.log('file not found')
            return;
        }

        element.click();
    }

    const uploadFile = async (e: any) => {
        console.log(e);

        // @ts-ignore
        const tg = window['Telegram'].WebApp;
        const file = e.target.files[0];

        if (!['image/png', 'image/jpeg'].includes(file['type'])) {
            tg.showAlert(t('teamCreateInvalidPhotoFormatError'));
            return;
        }

        if (file['size'] > 4e6) {
            tg.showAlert(t('teamCreateInvalidPhotoSizeError'));
            return;
        }

        const reader = new FileReader();

        reader.onload = (event: any) => {
            setImageSrc(event.target.result);
        };

        reader.readAsDataURL(file);
        onUpload(file);
    }

    return (
        <div className="UploadPhoto--container">
            {imageSrc && (
                <div
                    className="UploadPhoto--button-1"
                    onClick={openUploadFile}
                >
                    <Img
                        onClick={openUploadFile}
                        src={imageSrc}
                        alt="Preview"
                        style={{ width: 70, height: 70 }}
                    />
                </div>
            )}

            {!imageSrc && (
                <>
                    <div
                        className="UploadPhoto--button"
                        onClick={openUploadFile}
                    >
                        <Img
                            width={70} height={70}
                            src={require('../../assets/images/emoji/camera.png')}
                        />
                    </div>

                    <p>{t('teamCreateUploadPhotoButton')}</p>
                </>
            )}

            <input
                onChange={uploadFile}
                style={{display: 'none'}}
                type="file"
                id="file"
                name="file"
                accept="image/png,image/jpeg"
                alt=""
            />
        </div>
    );
};

export default UploadPhoto;