import { Box, Button,Typography } from '@mui/material';
import { Save } from '@mui/icons-material';
import Link from 'next/link';

export interface EditorButtonProps {
    SaveLink: string;
    onSave: () => void;
}

export const EditorButton:React.FC<EditorButtonProps> =({SaveLink, onSave}) => {

    return (
        <Box>
            <Link href={SaveLink} passHref prefetch={false}>
                <Button
                    size="small"
                    variant="contained"
                    color="success"
                    sx={{ ml: 2}}
                    >
                    <Typography sx={{ fontSize: "16px" }} onClick={onSave}><Save sx={{pb:0.3, mr:0.3}} />保存</Typography>  {/* テキストのサイズを変更 */}
                </Button>
            </Link>
        </Box>
    );
};  

export default EditorButton;