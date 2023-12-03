import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
df = pd.read_excel('test.xlsx')
df['date'] = pd.to_numeric(df['date'])
features = ['date', 'temperature']
target_variables = ['total_p1c_in_hour', 'total_p2c_in_hour', 'total_p3c_in_hour',
                    'total_p1v_in_hour', 'total_p2v_in_hour', 'total_p3v_in_hour']
X = df[features]
y = df[target_variables]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2)
lr_model = LinearRegression()
lr_model.fit(X_train, y_train)
dt_model = DecisionTreeRegressor()
dt_model.fit(X_train, y_train)
rf_model = RandomForestRegressor()
rf_model.fit(X_train, y_train)
lr_pred = lr_model.predict(X_test)
dt_pred = dt_model.predict(X_test)
rf_pred = rf_model.predict(X_test)
lr_rmse = mean_squared_error(y_test, lr_pred, squared=False)
dt_rmse = mean_squared_error(y_test, dt_pred, squared=False)
rf_rmse = mean_squared_error(y_test, rf_pred, squared=False)
print(f"Linear Regression RMSE: {lr_rmse}")
print(f"Decision Tree Regression RMSE: {dt_rmse}")
print(f"Random Forest Regression RMSE: {rf_rmse}")
new_data = pd.read_excel("future_generator_2_data_without_readings.xlsx")
new_data['date'] = pd.to_numeric(new_data['date'])
predicted_readings = rf_model.predict(new_data)
new_data['total_p1c_in_hour'] = predicted_readings[:, 0]
new_data['total_p2c_in_hour'] = predicted_readings[:, 1]
new_data['total_p3c_in_hour'] = predicted_readings[:, 2]
new_data['total_p1v_in_hour'] = predicted_readings[:, 3]
new_data['total_p2v_in_hour'] = predicted_readings[:, 4]
new_data['total_p3v_in_hour'] = predicted_readings[:, 5]
new_data.to_excel(
    "predicted_generator_2_readings_for_given_date.xlsx", index=False)
