


export const fileUpload = async( file ) => {

    const cloudURL = 'https://api.cloudinary.com/';//se debe completar la url para conectar con el api correspondiente

    const formData = new FormData();
    formData.append('upload_preset','react_journal');
    formData.append('file',file);

    try {
        const resp = await fetch( cloudURL, {
            method: 'POST',
            body: formData
        });

        if ( resp.ok ){
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }else{
            throw await resp.json();
        }

    } catch (error) {
        throw error;
    }
}