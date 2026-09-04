import xarray as xr, pandas as pd
ds = xr.open_dataset("sample_data.nc")
df = pd.DataFrame({
    "forecast": ds["forecast"].values.flatten()[:10000],
    "actual": ds["actual"].values.flatten()[:10000]
})
df["error"] = abs(df["forecast"]-df["actual"])
df["bust_label"] = (df["error"]>5).astype(int) # 5mm = bust
df.to_csv("error_database.csv", index=False)
print(f"Done - error_database.csv {len(df)} rows = ImageNet moment")