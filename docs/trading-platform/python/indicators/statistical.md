# Statistical

## OpenAlgo Statistical Indicators Documentation

Statistical indicators analyze price data using mathematical and statistical methods to identify patterns, relationships, and forecast future price movements.

### Import Statement

```python
from openalgo import ta
```

### Getting Market Data

```python
from openalgo import api

client = api(api_key='your_api_key_here', host='http://127.0.0.1:5000')

# Fetch historical data
df = client.history(symbol="SBIN", 
                   exchange="NSE", 
                   interval="5m", 
                   start_date="2025-04-01", 
                   end_date="2025-04-08")
```

### Available Statistical Indicators

***

### Linear Regression (LINREG)

Linear Regression calculates the linear regression line for a given period using the least squares method to identify the underlying trend.

#### Usage

```python
linreg_result = ta.linreg(data, period)
```

#### Parameters

* **data** _(array-like)_: Price data (typically closing prices)
* **period** _(int, default=14)_: Period for linear regression calculation

#### Returns

* **array**: Linear regression values in the same format as input

#### Example

```python
# Calculate 20-period Linear Regression
linreg_20 = ta.linreg(df['close'], 20)

# Add to DataFrame
df['LINREG_20'] = linreg_20

print(df[['close', 'LINREG_20']].tail())
```

***

### Linear Regression Slope (LRSLOPE)

Linear Regression Slope measures the rate of change of the linear regression line, indicating the strength and direction of the trend.

#### Usage

```python
slope_result = ta.lrslope(data, period=100, interval=1)
```

#### Parameters

* **data** _(array-like)_: Price data (typically closing prices)
* **period** _(int, default=100)_: Period for linear regression calculation
* **interval** _(int, default=1)_: Interval divisor for slope calculation

#### Returns

* **array**: Slope values in the same format as input

#### Example

```python
# Calculate Linear Regression Slope
slope_50 = ta.lrslope(df['close'], period=50)

# Add to DataFrame
df['LR_SLOPE_50'] = slope_50

print(df[['close', 'LR_SLOPE_50']].tail())
```

***

### Pearson Correlation Coefficient (CORREL)

Correlation measures the statistical relationship between two data series, ranging from -1 (perfect negative correlation) to +1 (perfect positive correlation).

#### Usage

```python
correlation_result = ta.correlation(data1, data2, period)
```

#### Parameters

* **data1** _(array-like)_: First data series
* **data2** _(array-like)_: Second data series
* **period** _(int, default=20)_: Period for correlation calculation

#### Returns

* **array**: Correlation values in the same format as input

#### Example

```python
# Calculate correlation between close and volume
correlation_20 = ta.correlation(df['close'], df['volume'], 20)

# Add to DataFrame
df['CORREL_CLOSE_VOLUME'] = correlation_20

print(df[['close', 'volume', 'CORREL_CLOSE_VOLUME']].tail())

# Calculate correlation between high and low
correlation_hl = ta.correlation(df['high'], df['low'], 15)
df['CORREL_HIGH_LOW'] = correlation_hl
```

***

### Beta Coefficient (BETA)

Beta measures the volatility of a security relative to the market, indicating how much the security price moves relative to market movements.

#### Usage

```python
beta_result = ta.beta(asset, market, period=252)
```

#### Parameters

* **asset** _(array-like)_: Asset price data
* **market** _(array-like)_: Market price data (benchmark)
* **period** _(int, default=252)_: Period for beta calculation (typically 1 year = 252 trading days)

#### Returns

* **array**: Beta values in the same format as input

#### Example

```python
# Assuming you have market index data
# For demonstration, we'll use another stock as market proxy
market_df = client.history(symbol="NIFTY", 
                          exchange="NSE_INDEX", 
                          interval="5m", 
                          start_date="2025-04-01", 
                          end_date="2025-04-08")

# Calculate 50-period Beta
beta_50 = ta.beta(df['close'], market_df['close'], 50)

# Add to DataFrame
df['BETA_50'] = beta_50

print(df[['close', 'BETA_50']].tail())
```

***

### Variance (VAR)

Variance measures the dispersion of price data, supporting both logarithmic returns and price modes with smoothing and signal generation.

#### Usage

```python
variance_result = ta.variance(data, lookback=20, mode="PR", ema_period=20, 
                             filter_lookback=20, ema_length=14, return_components=False)
```

#### Parameters

* **data** _(array-like)_: Price data (close prices)
* **lookback** _(int, default=20)_: Variance lookback period
* **mode** _(str, default="PR")_: Variance mode ("LR" for Logarithmic Returns, "PR" for Price)
* **ema\_period** _(int, default=20)_: EMA period for variance smoothing
* **filter\_lookback** _(int, default=20)_: Lookback period for variance filter
* **ema\_length** _(int, default=14)_: EMA length for z-score smoothing
* **return\_components** _(bool, default=False)_: If True, returns all components

#### Returns

* **array or tuple**: Variance values or (variance, ema\_variance, zscore, ema\_zscore, stdev) if return\_components=True

#### Example

```python
# Calculate basic variance
variance_20 = ta.variance(df['close'], lookback=20)
df['VARIANCE_20'] = variance_20

# Calculate variance with all components
var_components = ta.variance(df['close'], lookback=20, return_components=True)
variance, ema_var, zscore, ema_zscore, stdev = var_components

df['VARIANCE'] = variance
df['EMA_VARIANCE'] = ema_var
df['VAR_ZSCORE'] = zscore

print(df[['close', 'VARIANCE', 'EMA_VARIANCE', 'VAR_ZSCORE']].tail())
```

***

### Time Series Forecast (TSF)

Time Series Forecast predicts the next value using linear regression analysis.

#### Usage

```python
tsf_result = ta.tsf(data, period=14)
```

#### Parameters

* **data** _(array-like)_: Price data
* **period** _(int, default=14)_: Period for forecast calculation

#### Returns

* **array**: Time Series Forecast values in the same format as input

#### Example

```python
# Calculate 14-period Time Series Forecast
tsf_14 = ta.tsf(df['close'], 14)

# Add to DataFrame
df['TSF_14'] = tsf_14

print(df[['close', 'TSF_14']].tail())

# Compare actual vs forecast
df['TSF_DIFF'] = df['close'] - df['TSF_14']
print("Forecast accuracy (last 10 periods):")
print(df[['close', 'TSF_14', 'TSF_DIFF']].tail(10))
```

***

### Rolling Median (MEDIAN)

Rolling Median calculates the median value over a rolling window, which is less sensitive to outliers than mean-based indicators.

#### Usage

```python
median_result = ta.median(data, period=3)
```

#### Parameters

* **data** _(array-like)_: Price data (default hl2 in Pine Script)
* **period** _(int, default=3)_: Period for median calculation

#### Returns

* **array**: Median values in the same format as input

#### Example

```python
# Calculate 5-period Rolling Median
median_5 = ta.median(df['close'], 5)

# Calculate median of typical price
typical_price = (df['high'] + df['low'] + df['close']) / 3
median_typical = ta.median(typical_price, 7)

# Add to DataFrame
df['MEDIAN_5'] = median_5
df['MEDIAN_TYPICAL'] = median_typical

print(df[['close', 'MEDIAN_5', 'MEDIAN_TYPICAL']].tail())
```

***

### Median Bands (MEDIAN\_BANDS)

Median Bands combine median calculation with ATR-based bands and EMA smoothing for comprehensive analysis.

#### Usage

```python
median, upper_band, lower_band, median_ema = ta.median_bands.calculate_with_bands(
    high, low, close, source=None, median_length=3, atr_length=14, atr_mult=2.0
)
```

#### Parameters

* **high** _(array-like)_: High prices
* **low** _(array-like)_: Low prices
* **close** _(array-like)_: Close prices
* **source** _(array-like, optional)_: Source data for median (default: hl2)
* **median\_length** _(int, default=3)_: Period for median calculation
* **atr\_length** _(int, default=14)_: Period for ATR calculation
* **atr\_mult** _(float, default=2.0)_: ATR multiplier for bands

#### Returns

* **tuple**: (median, upper\_band, lower\_band, median\_ema) arrays

#### Example

```python
# Calculate Median Bands
median, upper, lower, median_ema = ta.median_bands.calculate_with_bands(
    df['high'], df['low'], df['close']
)

# Add to DataFrame
df['MEDIAN'] = median
df['MEDIAN_UPPER'] = upper
df['MEDIAN_LOWER'] = lower
df['MEDIAN_EMA'] = median_ema

print(df[['close', 'MEDIAN', 'MEDIAN_UPPER', 'MEDIAN_LOWER']].tail())
```

***

### Rolling Mode (MODE)

Rolling Mode calculates the most frequent value over a rolling window using discretization.

#### Usage

```python
mode_result = ta.mode(data, period=20, bins=10)
```

#### Parameters

* **data** _(array-like)_: Price data
* **period** _(int, default=20)_: Period for mode calculation
* **bins** _(int, default=10)_: Number of bins for discretization

#### Returns

* **array**: Mode values in the same format as input

#### Example

```python
# Calculate 15-period Rolling Mode
mode_15 = ta.mode(df['close'], period=15, bins=8)

# Add to DataFrame
df['MODE_15'] = mode_15

print(df[['close', 'MODE_15']].tail())

# Calculate mode for volume (often useful for volume analysis)
volume_mode = ta.mode(df['volume'], period=20, bins=12)
df['VOLUME_MODE'] = volume_mode
```

***

### Complete Example: Statistical Analysis Dashboard

```python
import pandas as pd
from openalgo import api, ta

# Get market data
client = api(api_key='your_api_key_here', host='http://127.0.0.1:5000')

df = client.history(symbol="SBIN", 
                   exchange="NSE", 
                   interval="5m", 
                   start_date="2025-04-01", 
                   end_date="2025-04-08")

# Calculate comprehensive statistical indicators
print("Calculating Statistical Indicators...")

# Trend Analysis
df['LINREG_20'] = ta.linreg(df['close'], 20)
df['LR_SLOPE_20'] = ta.lrslope(df['close'], 20)
df['TSF_14'] = ta.tsf(df['close'], 14)

# Central Tendency
df['MEDIAN_5'] = ta.median(df['close'], 5)
df['MODE_15'] = ta.mode(df['close'], 15)

# Variability Analysis
df['VARIANCE_20'] = ta.variance(df['close'], 20)

# Get variance components for detailed analysis
var_components = ta.variance(df['close'], lookback=20, return_components=True)
variance, ema_var, zscore, ema_zscore, stdev = var_components

df['VARIANCE'] = variance
df['EMA_VARIANCE'] = ema_var
df['VAR_ZSCORE'] = zscore
df['STDEV'] = stdev

# Correlation Analysis
df['CORREL_CLOSE_VOLUME'] = ta.correlation(df['close'], df['volume'], 20)
df['CORREL_HIGH_LOW'] = ta.correlation(df['high'], df['low'], 15)

# Median Bands Analysis
median, upper, lower, median_ema = ta.median_bands.calculate_with_bands(
    df['high'], df['low'], df['close'], median_length=5, atr_length=14
)

df['MEDIAN_BANDS'] = median
df['MEDIAN_UPPER'] = upper
df['MEDIAN_LOWER'] = lower
df['MEDIAN_EMA'] = median_ema

# Create analysis summary
analysis_cols = [
    'close', 'LINREG_20', 'LR_SLOPE_20', 'TSF_14', 
    'MEDIAN_5', 'VARIANCE_20', 'VAR_ZSCORE', 
    'CORREL_CLOSE_VOLUME', 'MEDIAN_BANDS'
]

print("\nStatistical Analysis Summary (Last 10 periods):")
print(df[analysis_cols].tail(10))

# Generate trading signals based on statistical indicators
print("\nGenerating Statistical Trading Signals...")

# Trend Strength Signal (based on Linear Regression Slope)
df['TREND_SIGNAL'] = 'NEUTRAL'
df.loc[df['LR_SLOPE_20'] > 0.5, 'TREND_SIGNAL'] = 'BULLISH'
df.loc[df['LR_SLOPE_20'] < -0.5, 'TREND_SIGNAL'] = 'BEARISH'

# Variance-based Volatility Signal
df['VOLATILITY_SIGNAL'] = 'NORMAL'
df.loc[df['VAR_ZSCORE'] > 1.5, 'VOLATILITY_SIGNAL'] = 'HIGH'
df.loc[df['VAR_ZSCORE'] < -1.5, 'VOLATILITY_SIGNAL'] = 'LOW'

# Price Position relative to Statistical Measures
df['PRICE_VS_LINREG'] = (df['close'] - df['LINREG_20']) / df['LINREG_20'] * 100
df['PRICE_VS_MEDIAN'] = (df['close'] - df['MEDIAN_5']) / df['MEDIAN_5'] * 100

# Forecast Accuracy
df['FORECAST_ERROR'] = abs(df['close'] - df['TSF_14'].shift(1))
df['FORECAST_ACCURACY'] = (1 - df['FORECAST_ERROR'] / df['close']) * 100

print("\nTrading Signals Summary:")
signal_summary = df[['TREND_SIGNAL', 'VOLATILITY_SIGNAL', 'PRICE_VS_LINREG', 
                    'PRICE_VS_MEDIAN', 'FORECAST_ACCURACY']].tail(5)
print(signal_summary)

# Statistical Summary
print("\nStatistical Metrics Summary:")
print(f"Average Correlation (Close vs Volume): {df['CORREL_CLOSE_VOLUME'].mean():.4f}")
print(f"Average Variance: {df['VARIANCE_20'].mean():.4f}")
print(f"Average Forecast Accuracy: {df['FORECAST_ACCURACY'].mean():.2f}%")
print(f"Current Trend Slope: {df['LR_SLOPE_20'].iloc[-1]:.4f}")

# Volatility Analysis
recent_volatility = df['VAR_ZSCORE'].tail(20)
print(f"Recent Volatility Z-Score: {recent_volatility.mean():.2f}")
print(f"Volatility Regime: {df['VOLATILITY_SIGNAL'].iloc[-1]}")
```

### Advanced Statistical Analysis

```python
# Advanced correlation matrix
def calculate_correlation_matrix(df, period=20):
    """Calculate correlation matrix for OHLCV data"""
    correlations = {}
    
    price_cols = ['open', 'high', 'low', 'close', 'volume']
    
    for i, col1 in enumerate(price_cols):
        for col2 in price_cols[i+1:]:
            corr_name = f"CORR_{col1.upper()}_{col2.upper()}"
            correlations[corr_name] = ta.correlation(df[col1], df[col2], period)
    
    return correlations

# Calculate all correlations
correlations = calculate_correlation_matrix(df, 20)
for name, values in correlations.items():
    df[name] = values

print("\nCorrelation Matrix (Latest Values):")
corr_cols = [col for col in df.columns if col.startswith('CORR_')]
latest_corr = df[corr_cols].iloc[-1]
print(latest_corr)

# Statistical anomaly detection
def detect_statistical_anomalies(df, z_threshold=2.0):
    """Detect statistical anomalies in price data"""
    
    # Price anomalies based on variance z-score
    df['PRICE_ANOMALY'] = abs(df['VAR_ZSCORE']) > z_threshold
    
    # Volume anomalies
    volume_zscore = (df['volume'] - df['volume'].rolling(20).mean()) / df['volume'].rolling(20).std()
    df['VOLUME_ANOMALY'] = abs(volume_zscore) > z_threshold
    
    # Return anomalies
    returns = df['close'].pct_change()
    returns_zscore = (returns - returns.rolling(20).mean()) / returns.rolling(20).std()
    df['RETURN_ANOMALY'] = abs(returns_zscore) > z_threshold
    
    return df

# Detect anomalies
df = detect_statistical_anomalies(df)

# Summary of anomalies
anomaly_summary = df[['PRICE_ANOMALY', 'VOLUME_ANOMALY', 'RETURN_ANOMALY']].sum()
print(f"\nAnomaly Detection Summary:")
print(f"Price Anomalies: {anomaly_summary['PRICE_ANOMALY']}")
print(f"Volume Anomalies: {anomaly_summary['VOLUME_ANOMALY']}")
print(f"Return Anomalies: {anomaly_summary['RETURN_ANOMALY']}")
```

### Performance Tips

1. **Period Selection**: Choose appropriate periods based on your analysis timeframe
2. **Data Quality**: Ensure clean data for accurate statistical calculations
3. **Correlation Interpretation**: Remember correlation doesn't imply causation
4. **Statistical Significance**: Consider sample size when interpreting results
5. **Regime Changes**: Monitor for changes in statistical relationships over time

### Common Use Cases

1. **Trend Analysis**: Use Linear Regression and slopes for trend identification
2. **Risk Management**: Apply variance and correlation for portfolio risk assessment
3. **Anomaly Detection**: Use statistical z-scores to identify unusual market behavior
4. **Forecasting**: Combine TSF with other indicators for price prediction
5. **Market Relationships**: Analyze correlations between different assets or timeframes
