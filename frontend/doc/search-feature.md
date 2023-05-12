# Search Feature

This project contains a search feature implemented in Vue.js, which enables users to search for specific data items by entering a search query in the search bar.

# Header Section
To use the search feature, you need to include the following code in your Vue.js component's template section:

``` js
<!-- Header -->
<Header title="" @input-change="handleInputChange" />
<!-- Header -->
```

- The `Header` component is where you can modify the header section of the search feature to match your project's design and requirements.
- The `@input-change` event is emitted to the parent node.
- You also need to define the `handleInputChange` method in the script section of your component.


# Script Section
In the `<script>` section of your Vue.js component, you need to define a few variables and methods to make the search feature work.

### Variable
``` js
export default defineComponent({
  data() {
    return {
      search: "",
      data: [],
      filteredData: [],
    };
  },
})
```
 - `search` is a variable that stores the incoming search query and is used as a keyword to find the data that matches the search query.
 - `data` is an array that contains all the data fetched from the API.
 - `filteredData` is an array that stores only the data that matches the search query.

### Method
``` js
  method: {
        handleInputChange(data) {
          this.search = data;
    },
  },
```
- The `handleInputChange` method is called when the input-change event is emitted.
- It updates the `search` variable with the new input value.

### Watch
``` js
  watch: {
        search(newVal, oldVal) {
      if (newVal) {
        this.filteredData = this.data.filter((item) => {
          return item.name.toLowerCase().includes(newVal.toLowerCase());
        });
      } else {
        this.filteredData = this.data;
      }
    },
  }
```

- The `watch` property watches for changes in the `search` variable and filters the `data` array to match the search query.
- If the search query is empty, the `filteredData` array will contain all the `data` from the data array.