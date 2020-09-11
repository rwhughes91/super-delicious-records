import React, { useState, useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import classes from './ImageUpload.module.scss'
import FormButton from '@components/UI/Buttons/FormButton/FormButton'
import { UserContext } from '@context/UserProvider'
import axios from 'axios'

const MyDropzone: React.FC = () => {
  const { user } = useContext(UserContext)
  const [files, setFiles] = useState<File[]>([])
  const [imageSetUrl, setImageSetUrl] = useState<string[]>([])

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => prevFiles.concat(acceptedFiles))
  }, [])

  const submitFilesHandler = useCallback(async () => {
    setImageSetUrl([])
    const data = new FormData()
    for (const file of files) {
      data.append('files', file)
    }
    try {
      const idToken = await user.user?.getIdToken()
      const res = await axios({
        method: 'post',
        url: '/api/upload',
        data,
        headers: { 'Content-Type': 'multipart/form-data', authorization: `Bearer ${idToken}` },
      })
      setFiles([])
      setImageSetUrl(res.data.imageSetUrl.join(', '))
    } catch (error) {
      setFiles([])
      console.log('there was an error')
    }
  }, [files, user.user?.getIdToken])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  let readyToLoadFiles = (
    <ol>
      {files.map((file, i) => {
        return <li key={i}>{file.name}</li>
      })}
    </ol>
  )

  if (files.length === 0) {
    readyToLoadFiles = <p>Drag and drop some files here, or click to select files</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ alignSelf: 'flex-end' }}>
        <FormButton styles={{ width: '10rem', alignSelf: 'flex-end' }} onClick={submitFilesHandler}>
          Upload
        </FormButton>
      </div>
      <span className={classes.UploadWarning}>1000 x 1000 images will yield the best results</span>
      <div {...getRootProps()} className={classes.ImageUpload}>
        <input {...getInputProps()} multiple={false} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className={classes.Files}>{readyToLoadFiles}</div>
        )}
      </div>
      {imageSetUrl.length > 0 ? (
        <div
          style={{
            marginTop: '1rem',
            paddingTop: '.5rem',
            borderTop: '1px solid var(--dark-purple-color)',
            color: 'var(--dark-purple-color)',
            fontSize: '1.6rem',
          }}
        >
          {imageSetUrl}
        </div>
      ) : null}
    </div>
  )
}

export default React.memo(MyDropzone)
