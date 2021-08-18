/**
 * step 3
 we need to create a table instance.
This is where we are going to make use of react table library

in the useTable hooks, we are passing an object as an argument.
In the object, we specify two properties:- columns and rows(data)
we can set columns to the imported array of COLUMNS that we hava created.
and data to the imported MOCK_DATA.

useTable hooks recommend that we memoize the rows and columns using 
useMemo hooks.
using useMemo hooks ensures that the data isn't recreated on every render.
 If we were not to memoize columns and data, react-table would think that it is receiving new data
 on every render and atempt to recalculate lots of logic every single time.
That would definitely affect the components performance.

A call to useTable will return a table instance which we will store in a 
constant

 */

/**
 * step 4
 Define a basic table structure using HTML

 */

import React,{useMemo} from 'react'
import {useTable} from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import {COLUMNS} from './columns'


const BasicTable = () => {

    const columns = useMemo(()=>COLUMNS,[]);
    const data = useMemo(()=>MOCK_DATA,[]);
    const tableInstance = useTable({
        columns,
        data
    });
    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                </tr>
            </tbody>
        </table>
    )
}

export default BasicTable
