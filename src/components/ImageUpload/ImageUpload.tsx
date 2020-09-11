import React, { useState, useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import classes from './ImageUpload.module.scss'
import FormButton from '@components/UI/Buttons/FormButton/FormButton'
import { UserContext } from '@context/UserProvider'
import axios from 'axios'

const MyDropzone: React.FC = () => {
  const { user } = useContext(UserContext)
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => prevFiles.concat(acceptedFiles))
  }, [])

  const submitFilesHandler = useCallback(async () => {
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
      console.log(res)
    } catch (error) {
      console.log(error)
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
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className={classes.Files}>{readyToLoadFiles}</div>
        )}
      </div>
    </div>
  )
}

export default React.memo(MyDropzone)
