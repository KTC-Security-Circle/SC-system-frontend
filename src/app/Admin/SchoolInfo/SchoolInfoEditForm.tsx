import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button, Grid, Typography, FormControl } from "@mui/material";
import { SchoolInfoUpdateDTO } from "./SchoolInfoDTO";
import { SchoolInfoAPI } from "./SchoolInfoAPIs";

interface EditFormProps<T> {
  initialData: T; // 初期値
  onSubmitSuccess?: (data: T) => void; // 成功時のコールバック
  currentUser: string; // 現在のユーザーID
  id: number; // 編集対象のID
}

const SchoolInfoEditForm = <T extends SchoolInfoUpdateDTO>({
  initialData,
  onSubmitSuccess,
  currentUser,
  id,
}: EditFormProps<T>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    defaultValues: initialData,
  });

  const handleFormSubmit: SubmitHandler<T> = async (data) => {
    try {
      const requestData = { ...data, updated_by: currentUser, updated_at: new Date().toISOString() };
      const response = await SchoolInfoAPI.updateSchoolInfo(id, requestData);
      if (onSubmitSuccess) onSubmitSuccess(response);
    } catch (error) {
      console.error("API呼び出しエラー: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">学校情報を編集</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Controller
              name="contents"
              control={control}
              rules={{ required: "内容は必須です" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="内容"
                  variant="outlined"
                  fullWidth
                  error={!!errors.contents}
                  helperText={errors.contents?.message}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            更新
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SchoolInfoEditForm;
