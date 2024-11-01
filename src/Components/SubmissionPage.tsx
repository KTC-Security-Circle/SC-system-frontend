"use client";
import React, { useState } from 'react';
import {
    Box,
    Container,
    FormControl,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent
} from '@mui/material';

export const SubmissionComponents: React.FC = () => {
    const [submissionType, setSubmissionType] = useState<string>('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setSubmissionType(event.target.value as string);
    };

    const renderTextField = () => {
        switch (submissionType) {
            case 'type1':
                return (
                    <>
                        <TextField fullWidth label="欠課届のフィールド" variant="outlined" />
                        <TextField fullWidth label="欠席日" variant="outlined" sx={{ mt: 2 }} />
                        <TextField 
                            multiline 
                            label="欠席事由" 
                            variant="outlined" 
                            rows={6}
                            sx={{ mt: 2 }} />
                    </>
                );
            case 'type2':
                return <TextField fullWidth label="タイプ2のフィールド" variant="outlined" />;
            case 'type3':
                return <TextField fullWidth label="タイプ3のフィールド" variant="outlined" />;
            case 'type4':
                return <TextField fullWidth label="タイプ4のフィールド" variant="outlined" />;
            case 'type5':
                return <TextField fullWidth label="タイプ5のフィールド" variant="outlined" />;
            case 'type6':
                return <TextField fullWidth label="タイプ6のフィールド" variant="outlined" />;
            case 'type7':
                return <TextField fullWidth label="タイプ7のフィールド" variant="outlined" />;
            case 'type8':
                return <TextField fullWidth label="タイプ8のフィールド" variant="outlined" />;
            case 'type9':
                return <TextField fullWidth label="タイプ9のフィールド" variant="outlined" />;
            case 'type10':
                return <TextField fullWidth label="タイプ10のフィールド" variant="outlined" />;
            case 'type11':
                return <TextField fullWidth label="タイプ11のフィールド" variant="outlined" />;
            case 'type12':
                return <TextField fullWidth label="タイプ12のフィールド" variant="outlined" />;
            case 'type13':
                return <TextField fullWidth label="タイプ13のフィールド" variant="outlined" />;
            case 'type14':
                return <TextField fullWidth label="タイプ14のフィールド" variant="outlined" />;
            case 'type15':
                return <TextField fullWidth label="タイプ15のフィールド" variant="outlined" />;
            case 'type16':
                return <TextField fullWidth label="タイプ16のフィールド" variant="outlined" />;
            case 'type17':
                return <TextField fullWidth label="タイプ17のフィールド" variant="outlined" />;
            case 'type18':
                return <TextField fullWidth label="タイプ18のフィールド" variant="outlined" />;
            case 'type19':
                return <TextField fullWidth label="タイプ19のフィールド" variant="outlined" />;
            case 'type20':
                return <TextField fullWidth label="タイプ20のフィールド" variant="outlined" />;
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1, mt: 8 }}>
                <FormControl fullWidth>
                    <InputLabel 
                        id="submission-type-label" 
                        shrink={true}>
                        申請内容
                    </InputLabel>
                    <Select
                        id="submission-type"
                        variant='standard'
                        value={submissionType}
                        onChange={handleChange}
                        label="申請内容"
                    >
                        <MenuItem value="type1">欠課届</MenuItem>
                        <MenuItem value="type2">タイプ2</MenuItem>
                        <MenuItem value="type3">タイプ3</MenuItem>
                        <MenuItem value="type4">タイプ4</MenuItem>
                        <MenuItem value="type5">タイプ5</MenuItem>
                        <MenuItem value="type6">タイプ6</MenuItem>
                        <MenuItem value="type7">タイプ7</MenuItem>
                        <MenuItem value="type8">タイプ8</MenuItem>
                        <MenuItem value="type9">タイプ9</MenuItem>
                        <MenuItem value="type10">タイプ10</MenuItem>
                        <MenuItem value="type11">タイプ11</MenuItem>
                        <MenuItem value="type12">タイプ12</MenuItem>
                        <MenuItem value="type13">タイプ13</MenuItem>
                        <MenuItem value="type14">タイプ14</MenuItem>
                        <MenuItem value="type15">タイプ15</MenuItem>
                        <MenuItem value="type16">タイプ16</MenuItem>
                        <MenuItem value="type17">タイプ17</MenuItem>
                        <MenuItem value="type18">タイプ18</MenuItem>
                        <MenuItem value="type19">タイプ19</MenuItem>
                        <MenuItem value="type20">タイプ20</MenuItem>
                    </Select>
                </FormControl>
                <Box mt={2}>{renderTextField()}</Box>
            </Box>
        </Container>
    );
};
