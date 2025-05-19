import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Paper,
  SxProps,
  Theme,
} from '@mui/material'
import { Upload as UploadIcon } from '@mui/icons-material'

interface FileUploadProps {
  accept?: string
  label: string
  onFileUpload: (fileUrl: string) => void
  disabled?: boolean
  sx?: SxProps<Theme>
}

const FileUpload = ({
  accept = '*',
  label,
  onFileUpload,
  disabled = false,
  sx,
}: FileUploadProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        setError('Invalid file type')
        return
      }

      setError(null)
      setIsLoading(true)

      try {
        const file = acceptedFiles[0]
        const fileUrl = URL.createObjectURL(file)
        onFileUpload(fileUrl)
      } catch (err) {
        setError('Failed to process file')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    },
    [onFileUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    disabled: disabled || isLoading,
    multiple: false,
  })

  return (
    <Paper
      {...getRootProps()}
      sx={{
        p: 3,
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'divider',
        backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.7 : 1,
        textAlign: 'center',
        transition: 'all 0.2s ease-in-out',
        ...sx,
      }}
    >
      <input {...getInputProps()} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {isLoading ? (
          <>
            <CircularProgress size={24} />
            <Typography>Uploading...</Typography>
          </>
        ) : (
          <>
            <UploadIcon
              fontSize="large"
              color={isDragActive ? 'primary' : 'action'}
            />
            <Typography variant="subtitle1" component="div">
              {isDragActive ? 'Drop the file here' : label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {accept === '*' ? 'Any file type' : `Accepted: ${accept}`}
            </Typography>
            <Button
              variant="contained"
              component="span"
              disabled={disabled}
              sx={{ mt: 1 }}
            >
              Select File
            </Button>
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
          </>
        )}
      </Box>
    </Paper>
  )
}

export default FileUpload