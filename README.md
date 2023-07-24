#Fee Calculator Console Application

This console-based application is designed to read in a CSV file containing data with columns for Id, Name, Description__c, Category__c, Sub_Category__c, Type__c, Quantity__c, and Unit_Price__c. The application calculates the total fees based on the provided data and presents the results in an easy-to-understand format.

How to Run the Application

To run the Fee Calculator application, follow these steps:

Ensure you have Node.js installed on your machine.

Clone the GitHub repository for this project.

Navigate to the "clariti-takehome/src" directory in your terminal.

Install the required dependencies by running:

Copy code
npm install
Start the application by running:

css
Copy code
node main.js
The application will guide you through the process of entering input and provide the fee totals for each level of the hierarchy.

Running Tests

The application includes unit tests to ensure its correctness. To run the tests, follow these steps:

Navigate to the "clariti-takehome/tests" directory in your terminal.

Run the following command:

bash
Copy code
npm test
The test suite will execute, and you'll see the test results along with the test coverage percentage.

Application Design and Features

This application is designed to scale easily with more additions to the existing hierarchy. Each level (Department, Category, SubCategory, Type) maintains a hashmap that references all of its containing levels. For instance, the "Development" department associates its string value to the actual object, enabling efficient navigation and retrieval of data.

The application performs a traversal of the entire CSV file, summing up every bucket's data. Once the bottom-level has acquired its grand total, the application recursively assigns sums based on the sum of all levels that the current level contains. This approach avoids duplicate or unnecessary calculations, ensuring optimal performance even as the application's hierarchy expands.

The use of hashmaps and efficient data processing allows for faster computation and a more maintainable codebase.

Feel free to explore the code and enjoy using this Fee Calculator console application!

For any questions or issues, please contact [your contact information].
