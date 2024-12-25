import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button, Grid, Typography, FormControl } from "@mui/material";
import { SchoolInfoCreateDTO } from "./SchoolInfoDTO";
import { SchoolInfoAPI } from "./SchoolInfoAPIs";

interface CreateFormProps<T> {
  onSubmitSuccess?: (data: T) => void; // 成功時のコールバック
  currentUser: string; // 現在のユーザーID
}

const SchoolInfoCreateForm = <T extends SchoolInfoCreateDTO>({
  onSubmitSuccess,
  currentUser,
}: CreateFormProps<T>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    defaultValues: {
      contents: "",
    } as T,
  });

  const handleFormSubmit: SubmitHandler<T> = async (data) => {
    try {
      const requestData = { ...data, created_by: currentUser };
      const response = await SchoolInfoAPI.createSchoolInfo(requestData);
      if (onSubmitSuccess) onSubmitSuccess(response);
    } catch (error) {
      console.error("API呼び出しエラー: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">新しい学校情報を追加</Typography>
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
            追加
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SchoolInfoCreateForm;