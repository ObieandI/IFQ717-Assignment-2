[Tourism App](#)

This App processes regional and date-based tourism data to provide insights for internal staff, government officials, and local hotel owners. It is built using React, Node.js, Express, Knex.js, and MySQL.

[Features](##)

- User authentication with role-based access.
- APIs for accessing regional and date-based tourism data.
- Data schema design and SQL database interaction.
- Data filtering, aggregation, and visualization support.

[Prerequisites](##)

- Node.js and npm installed
- MySQL server installed and running
- MySQL Workbench for database management

[Installation](##)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/tourism-app.git
   cd tourism-app
   ``` 

2. Install dependencies:
    
    ```bash
    npm install
    ```

3. Create a .env file in the root directory with the following content:
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=tourism
    PORT=5000
    JWT_SECRET=your_jwt_secret

4. Start the server:
    ```bash
    npm start
    ```

[Importing the Tourism Database](##)

To import the `tourism` database:

1. Open MySQL Workbench.
2. Go to **Server > Data Import**.
3. Select **Import from Self-Contained File** and choose `tourism.sql`.
4. Click **Start Import** to restore the database.


[Database Schema](##)

[Table:  length_stay_revervation](###)

This table contains the same content as the raw data from class "length_of_stay_and_reservation_window.csv"

[Table:  occupancy](###)

This table contains the same content as the raw data from class "historical_occupancy_and_average_daily_rate.csv"

[Table: regions](###)
| Column      | Type        | Description              |
|-------------|-------------|--------------------------|
| id          | INT         | Primary key (auto-increment) |
| region_name | VARCHAR(255)| Unique name of the region |

[Table: statistics](###)
| Column                        | Type   | Description                          |
|-------------------------------|--------|--------------------------------------|
| id                            | INT    | Primary key (auto-increment)         |
| region_id                     | INT    | Foreign key referencing `regions.id` |
| date                          | DATE   | Date of the statistic                |
| average_historical_occupancy  | FLOAT  | Average historical occupancy (%)     |
| average_daily_rate            | FLOAT  | Average daily rate ($)               |
| average_length_of_stay        | FLOAT  | Average length of stay (days)        |
| average_booking_window        | FLOAT  | Average booking window (days)        |


[API Documentation](##)

The API documentation will be available at `/api-docs` after Swagger UI is incorproated. You can access it after running the server at `http://localhost:5000/api-docs`.

[User Management](##)

[Public Registration (Hotel and Government Users)](###)

The POST /users/register endpoint allows hotel and government users to register themselves directly.

1. How It Works

   - Users must provide a username, password, and role during registration.
   - Accepted roles for public registration:
        hotel
        government
   - If the role is invalid or the username already exists, the registration will fail with an appropriate error message.

2. Endpoint Details

    URL: POST /users/register

    Request Body:

        ``` jason

        {
        "username": "hotel_1",
        "password": "password1234",
        "role": "hotel"
        }

         ```

    Responses:

        Success:

            {
            "message": "User registered successfully."
            }

        Error (Invalid Role):

            {
            "error": "Invalid role. Only \"hotel\" and \"government\" roles can register."
            }

        Error (Duplicate Username):

            {
            "error": "Username already exists."
            }

3.  Database Updates

    A new entry is added to the users table with the provided username, a hashed password, and the specified role.

[Admin User Management](###)

Admin users cannot register themselves through the public registration endpoint. They are added and managed exclusively through the back-end.

1. How Admin Users Are Managed

    Admin users are added using a Knex seed file.
    A pre-defined seed file (seeds/add_admin_user.js) inserts admin users into the users table.

2. Adding a New Admin User

    To add a new admin user:

        Open the seeds/add_admin_user.js file.
        Update the username and password fields as needed.
        Run the seed file:

        npx knex --knexfile ./config/knexfile.js seed:run --specific=add_admin_user.js

2. Verifying Admin Users

    After running the seed file, confirm the admin user exists in the database:

        Open MySQL Workbench or your database management tool.
        Run the following query:

        SELECT * FROM users WHERE role = 'admin';

3. Security Notes

    Only trusted developers or staff should have access to the seed file.
    Ensure the admin user passwords are hashed securely.

[Admin: Add Tourism Statistics](##)

This feature allows admin users to add new tourism statistics to the database. The `POST /admin/statistics` endpoint ensures that only authorized admin users can perform this operation.

[API Endpoint](###)
- URL: `POST /admin/statistics`
- Authorization: Requires a valid JWT token for an admin user in the `Authorization` header.
- Role Restriction: Only accessible to users with the role `admin`.

[Request](###)

[Headers](####)

```json

{
  "Authorization": "Bearer <your_admin_token>"
}

```

[Body](####)

```json

{
  "region_name": "Noosa",
  "date": "2024-01-01",
  "average_historical_occupancy": 75.5,
  "average_daily_rate": 120.0,
  "average_length_of_stay": 3.2,
  "average_booking_window": 14.0
}
```

[Response](####)

| Status Code | Description                                   |
|-------------|-----------------------------------------------|
| `201`       | Success: Tourism statistics added successfully. |
| `401`       | Unauthorized: Missing or invalid JWT token.   |
| `403`       | Forbidden: User is not an admin.              |
| `400`       | Bad Request: Invalid or missing input fields. |
| `500`       | Internal Server Error: Database or server issue. |

[Verify in SQL database](###)

Run the following query in MySQL workbench:

```sql

SELECT 
    s.id AS statistics_id,
    r.region_name,
    s.date,
    s.average_historical_occupancy,
    s.average_daily_rate,
    s.average_length_of_stay,
    s.average_booking_window
FROM 
    statistics s
JOIN 
    regions r
ON 
    s.region_id = r.id
ORDER BY 
    s.id DESC
LIMIT 1;

```

[Workflow](###)

1.  Validation: Ensure the JWT token is valid and the user has the admin role
2.  Region check: If region_name doesn’t exist in the regions table, it will be added automatically
3.  Statistics Insertion: Insert the provided statistics into the statistics table with a reference to the region_id from the regions table

[Security](###)
-   Only admin users are authorized to access this endpoint. Authorization is enforced using a JWT-based middleware.
-   Tokens are validated for expiry and role (must be admin)

[Front-End Integration Suggestions](###)

1.  Role-Specific UI: Ensure that only admin users see options to add tourism statistics
2.  Token Management: Use the admin user's JWT token for authentication
3.  Form design: Add a form with fields matching the API request body
    -   Dropdown or autocomplete for region_name (to suggest existing regions).
    -   Input fields for date, average_historical_occupancy,average_daily_rate, average_length_of_stay, and average_booking_window.
4.  Error Handling: Display appropriate messages based on the response (e.g., unauthorized, validation errors)

[Government: View Average Occupancy and Daily Rates](##)

This feature allows government users to view average occupancy rates and daily rates by region. The `GET /government/occupancy-rates` endpoint provides this information in a format that supports data visualization and performance monitoring.

[API Endpoint](###)
- URL: `GET /government/occupancy-rates`
- Authorization: Requires a valid JWT token for a government user in the `Authorization` header.
- Role Restriction: Only accessible to users with the role `government`.

[Request](###)

[Headers](####)

```json
{
  "Authorization": "Bearer <your_government_token>"
}

```

[Response](####)

| Status Code | Description                                   |
|-------------|-----------------------------------------------|
| `201`       | Success: Returns average occupancy and daily rates by region. |
| `401`       | Unauthorized: Missing or invalid JWT token.   |
| `403`       | Forbidden: User is not a goverment user.              |
| `400`       | Bad Request: Invalid or missing input fields. |
| `500`       | Internal Server Error: Database or server issue. |

Example successful response:

```jason
{
	"data": [
		{
			"region_name": "Cairns",
			"average_historical_occupancy": 0.6164819374558178,
			"average_daily_rate": 260.8591088356056
		},
		{
			"region_name": "Gold Coast",
			"average_historical_occupancy": 0.6003779965668476,
			"average_daily_rate": 310.40073824476923
		}
    ]
}


```

[Verify in SQL database](###)

Run the following query in MySQL workbench:

```sql

SELECT 
    r.region_name,
    AVG(s.average_historical_occupancy) AS average_historical_occupancy,
    AVG(s.average_daily_rate) AS average_daily_rate
FROM 
    statistics s
JOIN 
    regions r
ON 
    s.region_id = r.id
GROUP BY 
    r.region_name;


```

[Workflow](###)

1.  Validation: Ensure the JWT token is valid and the user has the government role
2.  Data Retrieval: Fetch data from the statistics and regions tables using SQL queries
3.  Aggregation: Calculate the average occupancy rates and daily rates for each region
4.  Response Formatting: Structure the data in JSON format for easy consumption by the frontend

[Security](###)
-   Only government users are authorized to access this endpoint. Authorization is enforced using a JWT-based middleware.
-   Tokens are validated for expiry and role (must be government)

[Front-End Integration Suggestions](###)

1.  Chart Design: Use Chart.js or a similar library to display the data visually (e.g., bar charts, line graphs)
2.  Token Management: Use the goverment user's JWT token for authentication
3.  Interactive Filters:
    -   Allow users to filter by region
    -   Display a dropdown or search bar for region selection
4.  Error Handling: Display appropriate messages based on the response (e.g., unauthorized, validation errors)

[Hotel: View Average Booking Windows and Daily Rate Trends](##)

This feature allows local hotel business owners to view average booking windows and daily rate trends. The `GET /hotel/booking-rates` endpoint provides this information in a format that supports data visualization and competitive pricing strategies.

[API Endpoint](###)
- URL: `GET /hotel/booking-rates`
- Authorization: Requires a valid JWT token for a hotel user in the `Authorization` header.
- Role Restriction: Only accessible to users with the role `hotel`.

[Request](###)

[Headers](####)

```json
{
  "Authorization": "Bearer <your_hotel_token>"
}
```

[Query Parameters](####)

| Parameter    | Type   | Description                                         | Required |
|--------------|--------|-----------------------------------------------------|----------|
| `region_name`| String | Filter results by a specific region.                | No       |
| `start_date` | Date   | Start date for filtering the statistics (YYYY-MM-DD). | No       |
| `end_date`   | Date   | End date for filtering the statistics (YYYY-MM-DD). | No       |


Example Request with Filters:

`GET /hotel/booking-rates?region_name=Noosa&start_date=2023-01-01&end_date=2023-12-31`

[Response](####)

| Status Code | Description                                   |
|-------------|-----------------------------------------------|
| `201`       | Success: Returns booking windows and daily rate trends. |
| `401`       | Unauthorized: Missing or invalid JWT token.   |
| `403`       | Forbidden: User is not a hotel user.              |
| `500`       | Internal Server Error: Database or server issue. |

Example successful response with filter (region + time):

```jason
{
	"data": [
		{
			"region_name": "Noosa",
			"average_booking_window": 55.66291699344165,
			"average_daily_rate": 353.4996253444724
		}
	]
}

```

[Verify in SQL database](###)

Run the following query in MySQL workbench:

Without Filters:

```sql

SELECT 
    r.region_name,
    AVG(s.average_booking_window) AS average_booking_window,
    AVG(s.average_daily_rate) AS average_daily_rate
FROM 
    statistics s
JOIN 
    regions r
ON 
    s.region_id = r.id
GROUP BY 
    r.region_name;

```
With filter of region and time:

```sql

SELECT 
    r.region_name,
    AVG(s.average_booking_window) AS average_booking_window,
    AVG(s.average_daily_rate) AS average_daily_rate
FROM 
    statistics s
JOIN 
    regions r
ON 
    s.region_id = r.id
WHERE 
    r.region_name = 'Noosa'
AND 
    s.date BETWEEN '2024-01-01' AND '2024-12-31'
GROUP BY 
    r.region_name;

```

[Workflow](###)

1.  Validation: Ensure the JWT token is valid and the user has the hotel role
2.  Dynamic Querying:
    -   Apply a region filter if region_name is provided.
    -   Apply a date range filter if both start_date and end_date are provided
3.  Data Retrieval: Fetch data from the statistics and regions tables using SQL queries
4.  Aggregation: Calculate the average booking rates and daily rates for each region and time frame
5.  Response Formatting: Structure the data in JSON format for easy consumption by the frontend

[Security](###)
-   Only hotel users are authorized to access this endpoint. Authorization is enforced using a JWT-based middleware.
-   Tokens are validated for expiry and role (must be hotel)

[Front-End Integration Suggestions](###)

1.  Chart Design: Use Chart.js or a similar library to display the data visually (e.g., bar charts, line graphs)
2.  Token Management: Use the goverment user's JWT token for authentication
3.  Interactive Filters:
    -   Allow users to filter by region and time range
    -   Display a dropdown or search bar for region selection
4.  Error Handling: Display appropriate messages based on the response (e.g., unauthorized, validation errors)

[Government: Export Filtered Data as CSV](##)

This feature allows government users to export filtered data in CSV format for further analysis using external tools. The `GET /government/export-data` endpoint generates a CSV file based on the specified filters.

[Installation](###)

```bash
npm install json2csv
```

[API Endpoint](###)
- URL: `GET /government/export-data`
- Authorization: Requires a valid JWT token for a government user in the `Authorization` header.
- Role Restriction: Only accessible to users with the role `government`.

[Query Parameters](####)

| Parameter    | Type   | Description                                         | Required |
|--------------|--------|-----------------------------------------------------|----------|
| `region_name`| String | Filter results by a specific region.                | No       |
| `start_date` | Date   | Start date for filtering the statistics (YYYY-MM-DD). | No       |
| `end_date`   | Date   | End date for filtering the statistics (YYYY-MM-DD). | No       |

[Request](###)

[Example Request with Filters](####)

`GET /government/export-data?start_date=2024-01-01&end_date=2024-12-31`

[Response](###)

| Status Code | Description                                   |
|-------------|-----------------------------------------------|
| `200`       | Success: Returns a CSV file with the filtered data. |
| `401`       | Unauthorized: Missing or invalid JWT token.   |
| `403`       | Forbidden: User is not a government user.     |
| `500`       | Internal Server Error: Database or server issue. |

[Example CSV Content](####)

```csv
region_name	date	average_historical_occupancy	average_daily_rate	average_length_of_stay	average_booking_window
Cairns	2022-12-31T14:00:00.000Z	0.776	283.815	10.6884	81.6115
Cairns	2023-01-01T14:00:00.000Z	0.7189	276.022	5.5602	71.4367
Cairns	2023-01-02T14:00:00.000Z	0.6871	272.275	5.3333	74.44
Cairns	2023-01-03T14:00:00.000Z	0.6647	267.2	4.9628	59.8801
Cairns	2023-01-04T14:00:00.000Z	0.6568	266.697	6.261	65.9397

```

[Workflow](###)

1.  Validation: 
    -   Ensure the JWT token is valid and the user has the goverment role
    -   Validate query parameters (if provided) for correctness and format.
2.  Data Retrieval: Fetch data from the database based on the filters provided in query parameters
4.  CSV generation: Use the json2csv library to convert the retrieved data into CSV format
5.  Response: Return the CSV file in the response with appropriate headers for download

[Security](###)
-   Only government users are authorized to access this endpoint. Authorization is enforced using a JWT-based middleware.
-   Tokens are validated for expiry and role (must be government)

[Front-End Integration Suggestions](###)

1.  Add Export Button: 
    -   Add a button to the government dashboard to initiate the CSV export process
    -   Pass filters (if any) as query parameters when making the API request
2.  React Router Navigation: Ensure the government dashboard is navigable via React Router after login
3.  Error Handling: Display appropriate messages based on the response (e.g., unauthorized, validation errors)

[Acknowledgments](##)

- MySQL for database management
- React for frontend development
- Node.js for backend development
- Swagger UI for API documentation

