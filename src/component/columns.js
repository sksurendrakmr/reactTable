/**
 Each object in the array represent a column in the table.
 
 After defining the Header key i.e. column name of the table
 Now we need a way to associate each column with the rows of data and
 for that we need to specify the accessor property for each column.
 (mapping each column to a specific data value in the mock data and this
    will help react-table identify what data goes under which column in each row )


Note: - If a column is left out from the below columns array, it 
would make it to the UI


 */
export const COLUMNS = [
    {
        Header:'Id', //ID columns
        accessor:'id', //we are defining the key which is present in the data
    },
    {
        Header:'First Name',
        accessor:'first_name',
    },
    {
        Header:'Last Name',
        accessor:'last_name',
    },
    {
        Header:'Date of Birth',
        accessor:'date_of_birth',
    },
    {
        Header:'Country',
        accessor:'country',
    },
    {
        Header:'Phone',
        accessor:'phone',
    },
]