import numpy as np
def lyapunov(delta_0, delta_t, t):
    return (1/t) * np.log(abs(delta_t)/(abs(delta_0)+1e-9))
lam = lyapunov(0.5, 4.2, 5)
print(f"Lambda={lam:.3f} -> {'BUST risk' if lam>0.3 else 'Stable'}")