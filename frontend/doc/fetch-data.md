# Fetch Data from database
Fetching data from a database is an essential feature of any web application. This guide will show you how to fetch data from a database using Node.js, Prisma ORM, and Vue.js.

# Backend
The backend is responsible for handling requests from the frontend and retrieving data from the database. Here's how to fetch data using Prisma ORM in Node.js:

``` js
app.get("/", async (req, res) => {
  try {
    const [YOUR-ENTITYNAME] = await prisma.[YOUR-ENTITYNAME].findMany();
    res.status(200).json([YOUR-ENTITYNAME]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
```

- This code uses the `findMany()` method of the Prisma ORM to retrieve all data from the database. The `async/await` syntax is used to handle the asynchronous nature of the database query. If the query is successful, the data are sent back to the frontend as a JSON response. If there's an error, a 500 status code and an error message are sent back to the frontend.


# Frontend
The frontend is responsible for displaying the data retrieved from the backend. Here's how to fetch and display data in Vue.js:

``` js
  data() {
    return {
      data: [], //All subject(s) in database
    };
  },
```
- This code defines a `data` array that will hold all the data retrieved from the backend.


``` js
    async fetchData() {
      try {
        const response = await axios.get("http://localhost:5050/subject")
        this.data = response.data
      } catch (error) {
        console.error(error);
      }
    },

```
- This code defines an `async` method called `fetchData()` that uses the `axios` library to make a GET request to the backend to retrieve the data. The response data is then assigned to the `data` array defined earlier.

``` js
  created() {
    this.fetchData();
  }
```
- This code calls the `fetchData()` method when the component is created. This ensures that the data are retrieved and displayed as soon as the component is rendered.

That's it! You've successfully fetched data from a database using Node.js, Prisma ORM, and Vue.js.

