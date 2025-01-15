
# HRMS Software

Bloat-free HRMS software designed specifically for small companies, tailored to meet the needs of businesses in Nepal.

## Description
This lightweight and user-friendly HRMS software simplifies the management of employees, leaves, and payroll. Its minimalistic design and focused features make it particularly useful for Nepali companies, ensuring compliance with local business requirements and regulations.


## Support

For support, email nepalsaurav123@gmail.com


## Authors

- [@nepalsaurav](https://github.com/nepalsaurav)


## Run Locally

Clone the project

```bash
  git clone https://github.com/nepalsaurav/hrms
```

Go to the project directory

```bash
  cd hrms
```

Install dependencies

```bash
  go mod tidy
```

Build pocketbase

```bash
   go build .
```

Start backend server

```bash
  ./hrms serve --http="0.0.0.0:8080"
```

Install Frontend

```bash
   cd frontend && pnpm install
```

Start the frontend server

```bash
  pnpm run dev
```


## Features

- Employee management
- Leave Management
- Payroll generation



## Tech Stack

**Client:** Vue js and bulma css

**Server:** Pocketbase and go


## Roadmap

- Release v 0.0.1 in feb 1, 2025 with basic features.


## Screenshots

![employee]("screenshot/employee.png")
![add employee]("screenshot/employee_add.png")
![employee detail view]("screenshot/employee_view.png")
![leave]("screenshot/leave.png")
![add leave]("screenshot/leave_add.png")
![payroll]("screenshot/payroll.png")
![payslip]("screenshot/payslip.png")
![salary structure]("screenshot/salary_structure.png")
![salary component]("screenshot/salary_component.png")
![settings]["screenshot/settings.png"]
![dashboard]["screenshot/dashboard.png"]



## Contributing

Contributions are always welcome!

This software is in early stage. So , if you want to contribute then please email me at nepalsaurav123@gmail.com
