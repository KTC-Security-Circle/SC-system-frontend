import { Button,Typography } from '@mui/material';
import { Save } from '@mui/icons-material';

export interface EditorButtonProps {
    SaveLink: string;
    onSave: () => void;
}

export const EditorButton:React.FC<EditorButtonProps> =({SaveLink, onSave}) => {

    return (
                <Button
                    size="small"
                    variant="contained"
                    color="success"
                    sx={{ ml: 2}}
                    onClick={onSave}
                    href={SaveLink}
                    >
                    <Typography sx={{ fontSize: "16px" }}><Save sx={{pb:0.3, mr:0.3}} />保存</Typography>  {/* テキストのサイズを変更 */}
                </Button>
    );
};  

export default EditorButton;