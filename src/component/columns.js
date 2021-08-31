/**
 * step-2 
 Each object in the array represent a column in the table.
 
 After defining the Header key i.e. column name of the table
 Now we need a way to associate each column with the rows of data and
 for that we need to specify the accessor property for each column.
 (mapping each column to a specific data value in the mock data and this
    will help react-table identify what data goes under which column in each row )


Note: - If a column is left out from the below columns array, it 
would make it to the UI

 */

import { format } from 'date-fns'
//format is a function which we use to format the date field.
import ColumnSearchFilter from './ColumnFilter/ColumnSearchFilter'

export const COLUMNS = [
  {
    Header: 'Id', //ID columns
    Footer: 'Id',
    accessor: 'id', //we are defining the key which is present in the data
    disableFilters: true,
  },
  {
    Header: 'First Name',
    Footer: 'First Name',
    accessor: 'first_name',
  },
  {
    Header: 'Last Name',
    Footer: 'Last Name',
    accessor: 'last_name',
  },
  {
    Header: 'Date of Birth',
    Footer: 'Date of Birth',
    accessor: 'date_of_birth',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy')
    },
  },
  {
    Header: 'Country',
    Footer: 'Country',
    accessor: 'country',
  },
  {
    Header: 'Phone',
    Footer: 'Phone',
    accessor: 'phone',
  },
]

export const GROUPED_COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Name',
    Footer: 'Full Name',
    columns: [
      //To group coulmns under a heading we use columns property
      {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name',
      },
    ],
  },
  {
    Header: 'Info',
    Footer: 'Info',
    columns: [
      {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'date_of_birth',
      },
      {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country',
      },
      {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone',
      },
    ],
  },
]
