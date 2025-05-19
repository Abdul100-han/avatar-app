import { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Box, Typography } from '@mui/material'
import AvatarViewerControls from './AvatarViewerControls'
import * as THREE from 'three'

interface ModelProps {
  url: string
  position?: [number, number, number]
  scale?: [number, number, number]
  visible?: boolean
}

const Model = ({ url, position = [0, 0, 0], scale = [1, 1, 1], visible = true }: ModelProps) => {
  const { scene } = useGLTF(url)
  const modelRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    }
  }, [scene])

  return (
    <group position={position} scale={scale} visible={visible} ref={modelRef}>
      <primitive object={scene} />
    </group>
  )
}

interface AvatarViewerProps {
  avatarUrl: string | null
  clothingUrl: string | null
  isClothingVisible: boolean
  onAvatarUpload: (url: string) => void
  onClothingUpload: (url: string) => void
  onClearScene: () => void
  onToggleClothingVisibility: () => void
}

const AvatarViewer = ({
  avatarUrl,
  clothingUrl,
  isClothingVisible,
  onAvatarUpload,
  onClothingUpload,
  onClearScene,
  onToggleClothingVisibility,
}: AvatarViewerProps) => {

  const [clothingColor, setClothingColor] = useState('#ffffff')
  const controlsRef = useRef<any>(null)

  const handleResetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box
        sx={{
          height: '60vh',
          width: '100%',
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        }}
      >
        {(!avatarUrl && !clothingUrl) && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              zIndex: 1,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Upload an avatar and clothing to get started
            </Typography>
          </Box>
        )}

        <Canvas shadows camera={{ position: [2, 2, 2], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <Suspense fallback={null}>
            <Environment preset="city" />
            {avatarUrl && <Model url={avatarUrl} position={[0, -1, 0]} />}
            {clothingUrl && (
              <Model
                url={clothingUrl}
                position={[0, -1, 0]}
                visible={isClothingVisible}
              />
            )}
          </Suspense>
          <OrbitControls
            ref={controlsRef}
            makeDefault
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
        </Canvas>
      </Box>

      <AvatarViewerControls
        onAvatarUpload={onAvatarUpload}
        onClothingUpload={onClothingUpload}
        onClearScene={onClearScene}
        onResetView={handleResetView}
        onToggleClothingVisibility={onToggleClothingVisibility}
        isClothingVisible={isClothingVisible}
        clothingColor={clothingColor}
        onClothingColorChange={setClothingColor}
        hasAvatar={!!avatarUrl}
        hasClothing={!!clothingUrl}
      />
    </Box>
  )
}

export default AvatarViewer