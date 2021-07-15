import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Container,
  IconButton,
  makeStyles,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core'
import { useCreateCourse } from '.'
import { ImageSearch } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  actions: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

export default function ThumbnailSection() {
  const styles = useStyles()
  const { update, course } = useCreateCourse()
  const { thumbnail } = course

  const fileEl = useRef(undefined)
  const worker = useRef(undefined)
  const [url, setUrl] = useState(undefined)
  const [image, setImage] = useState(undefined)

  useEffect(() => {
    worker.current = new Worker('/workers/dispose.worker.js')
    return () => {
      worker.current.terminate()
      worker.current = undefined
    }
  }, [])

  function onFileChange(e) {
    const file = e.target.files[0]
    const newImage = URL.createObjectURL(file)
    onImageChange(newImage)
    setUrl(file.name)
  }

  function onUrlChange(e) {
    setUrl(e.target.value)

    // validate image
    const newImage = new Image()
    newImage.onload = function () {
      if (this.width > 0) onImageChange(e.target.value)
    }
    newImage.src = e.target.value
  }

  function onImageChange(value) {
    worker.current?.postMessage(image)
    setImage(value)
  }

  return (
    <>
      <Container maxWidth="md">
        <Box height={0} paddingTop="56.25%" position="relative">
          <Box
            zIndex={1}
            position="absolute"
            top={0}
            left={0}
            bottom={0}
            right={0}
          >
            <img src={image} style={{ width: '100%', height: '100%' }} />
          </Box>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            style={{ transform: 'translate(-50%,-50%)' }}
          >
            <Typography color="textSecondary" variant="h6">
              <i>Select an Image for your Course</i>
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <input
            onChange={onFileChange}
            type="file"
            accept="image/*"
            ref={fileEl}
            style={{ display: 'none' }}
          />
          <TextField
            fullWidth
            onFocus={(e) => e.target.select()}
            type="url"
            name="thumbnail"
            placeholder="Paste an url here..."
            value={url}
            onChange={onUrlChange}
          />
          <Tooltip title="Pick image from your computer">
            <IconButton onClick={() => fileEl.current.click()}>
              <ImageSearch />
            </IconButton>
          </Tooltip>
        </Box>
      </Container>
    </>
  )
}
