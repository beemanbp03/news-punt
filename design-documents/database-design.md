# Database Design
This application should have tables for user information, NFL teams, and news posts.

## Table: Users

- `Name`: Users
- `Comment`: Users Information

### `Primary Key`

- `Columns`: UserID

### `Foreign Keys[]`

| `Columns`    | `Ref Table` | `Ref Columns` |
| ------------ | ----------- | ------------- |
| SelectedTeam | NFL Teams | TeamName |

### `Columns[]`

| `Label`       | `Name`       | `Type`             | `Nullable` | `Default` | `Comment` |
| ------------- | ------------ | ------------------ | ---------- | --------- | --------- |
| ID            | UserID       | int auto_increment | `false`    |           |           |
| Last Name     | LastName     | varchar(50)        | `false`    |           |           |
| First Name    | FirstName    | varchar(50)        | `false`    |           |           |
| User Name     | UserName     | varchar(50)        | `false`    |           |           |
| Password      | Password     | varchar(50)        | `false`    |           |           |
| Email         | Email        | varchar(50)        | `false`    |           |           |
| Birthdate     | Birthdate    | date               | `false`    |           |           |
| Phone         | Phone        | int                | `true`     |           |           |
| Address       | Address      | varchar(50)        | `true`     |           |           |
| PhoneEnabled  | PhoneEnabled | boolean            | `false`    |           |           |

## Table: NFL Teams
- `Name`: NFL Teams
- `Comment`: Holds basic info on all NFL teams

### `Primary Key`
- `Columns`: TeamID

### `Columns[]`

| `Label`     | `Name`     | `Type`             | `Nullable` | `Comment` |
| ----------- | ---------- | ------------------ | ---------- | --------- |
| ID          | TeamID     | int auto_increment | `false`    |           |
| Team Name   | TeamName   | varchar(50)        | `false`    |           |
| Team Logo   | TeamLogo   | file               | `false`    |           |
| Color Codes | ColorCodes | array              | `false`    |           |