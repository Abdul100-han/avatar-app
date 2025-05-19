import { useState } from 'react'
import Head from 'next/head'
// import Layout from '../components/Layout'
// import AvatarViewer from '../components/AvatarViewer'
import { Box, Container, Typography } from '@mui/material'
import AvatarViewer from '@/components/AvatarViewer/AvatarViewer'
import Layout from '@/components/Layout/Layout'

export default function Home() {
  const [avatar, setAvatar] = useState<string | null>(null)
  const [clothing, setClothing] = useState<string | null>(null)
  const [isClothingVisible, setIsClothingVisible] = useState(true)

  const handleAvatarUpload = (fileUrl: string) => {
    setAvatar(fileUrl)
  }

  const handleClothingUpload = (fileUrl: string) => {
    setClothing(fileUrl)
    setIsClothingVisible(true)
  }

  const handleClearScene = () => {
    setAvatar(null)
    setClothing(null)
  }

  return (
    <>
      <Head>
        <title>Threadswift - 3D Avatar Fitting</title>
        <meta name="description" content="3D Avatar Fitting App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              3D Avatar Fitting App
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Upload an avatar and clothing to see how they fit together
            </Typography>
          </Box>

          <AvatarViewer
            avatarUrl={avatar}
            clothingUrl={clothing}
            isClothingVisible={isClothingVisible}
            onAvatarUpload={handleAvatarUpload}
            onClothingUpload={handleClothingUpload}
            onClearScene={handleClearScene}
            onToggleClothingVisibility={() => setIsClothingVisible(!isClothingVisible)}
          />
        </Container>
      </Layout>
    </>
  )
}