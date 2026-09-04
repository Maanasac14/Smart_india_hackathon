# Step 13: Calibrated Uncertainty Quantification (Conformal Prediction via MAPIE / Split Conformal)
# Equation: C(x) = [f(x) - q, f(x) + q] | q = (1-alpha) quantile of non-conformity scores |y - f(x)|
# Grounding: Norbert Wiener (Prediction Under Uncertainty)
# Repository: https://github.com/Maanasac14/SIH

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor

# Load paired forecast-error benchmark dataset (Step 6)
df = pd.read_csv("error_database.csv")
X, y = df[["forecast"]].values, df["error"].values

# Proper calibration split: Train, Calibration, Test
X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.4, random_state=42)
X_calib, X_test, y_calib, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42)

# 1. Fit Base Predictive Regressor
model = GradientBoostingRegressor(n_estimators=100, max_depth=4, random_state=42)
model.fit(X_train, y_train)

# 2. Conformal Calibration (Norbert Wiener uncertainty calibration)
alpha = 0.10  # 90% target coverage
calib_preds = model.predict(X_calib)
residuals = np.abs(y_calib - calib_preds)

# Finite-sample calibrated quantile with (1 + 1/n) correction
n = len(residuals)
q_level = np.ceil((n + 1) * (1.0 - alpha)) / n
q_val = np.quantile(residuals, np.clip(q_level, 0.0, 1.0), interpolation="higher")

# 3. Predict calibrated confidence intervals on test set
test_preds = model.predict(X_test)
lower_bounds = np.maximum(0.0, test_preds - q_val)
upper_bounds = test_preds + q_val

# Empirical coverage verification
empirical_coverage = np.mean((y_test >= lower_bounds) & (y_test <= upper_bounds)) * 100.0

print(f"=== Step 13: Conformal Prediction Output ===")
print(f"Sample Forecast Error Point Prediction: {test_preds[0]:.2f} mm")
print(f"Conformal Calibration Quantile (q_1-alpha): ±{q_val:.2f} mm")
print(f"Sample 90% Calibrated Interval: [{lower_bounds[0]:.2f}, {upper_bounds[0]:.2f}] mm")
print(f"Empirical Coverage on Test Set: {empirical_coverage:.2f}% (Nominal Target: {int((1-alpha)*100)}%)")