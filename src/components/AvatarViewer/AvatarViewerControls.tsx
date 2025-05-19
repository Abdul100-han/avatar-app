import { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  Switch,
  FormControlLabel,
  Typography,
  TextField,
} from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid2";
import { Grid } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ReplayIcon from "@mui/icons-material/Replay";
import FileUpload from "../FileUpload/FileUpload";

interface AvatarViewerControlsProps {
  onAvatarUpload: (url: string) => void;
  onClothingUpload: (url: string) => void;
  onClearScene: () => void;
  onResetView: () => void;
  onToggleClothingVisibility: () => void;
  onClothingColorChange: (color: string) => void;
  isClothingVisible: boolean;
  clothingColor: string;
  hasAvatar: boolean;
  hasClothing: boolean;
  isLoading: boolean;
}

const AvatarViewerControls = ({
  onAvatarUpload,
  onClothingUpload,
  onClearScene,
  onResetView,
  onToggleClothingVisibility,
  onClothingColorChange,
  isClothingVisible,
  clothingColor,
  hasAvatar,
  hasClothing,
  isLoading,
}: AvatarViewerControlsProps) => {
  const [activeTab, setActiveTab] = useState<"upload" | "adjust">("upload");

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <ButtonGroup fullWidth>
          <Button
            onClick={() => setActiveTab("upload")}
            variant={activeTab === "upload" ? "contained" : "outlined"}
          >
            Upload
          </Button>
          <Button
            onClick={() => setActiveTab("adjust")}
            variant={activeTab === "adjust" ? "contained" : "outlined"}
            disabled={!hasAvatar && !hasClothing}
          >
            Adjust
          </Button>
        </ButtonGroup>
      </Box>

      {activeTab === "upload" ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FileUpload
              accept=".glb,.gltf"
              label="Upload Avatar (GLB/GLTF)"
              onFileUpload={onAvatarUpload}
              disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FileUpload
              accept=".glb,.gltf"
              label="Upload Clothing (GLB/GLTF)"
              onFileUpload={onClothingUpload}
              disabled={isLoading}
            />
          </Grid>
        </Grid>
      ) : (
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Scene Controls
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<ReplayIcon />}
                onClick={onResetView}
                fullWidth
              >
                Reset View
              </Button>
              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={onClearScene}
                fullWidth
                color="error"
              >
                Clear Scene
              </Button>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Clothing Controls
            </Typography>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isClothingVisible}
                    onChange={onToggleClothingVisibility}
                    color="primary"
                  />
                }
                label={
                  isClothingVisible ? "Clothing Visible" : "Clothing Hidden"
                }
              />
              <Box>
                <Typography variant="body2" gutterBottom>
                  Clothing Color
                </Typography>
                <TextField
                  type="color"
                  value={clothingColor}
                  onChange={(e) => onClothingColorChange(e.target.value)}
                  fullWidth
                />
              </Box>
            </Stack>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default AvatarViewerControls;
