import logo from './logo.svg'
import './App.css'
import BasicTable from './component/BasicTable'
import SortingTable from './component/SortingTable'
import FilteringTable from './component/GlobalFilter/FilteringTable'

function App() {
  return (
    <div className='App'>
      <h1>React Table</h1>
      {/* <BasicTable /> */}
      {/* <SortingTable /> */}
      <FilteringTable />
    </div>
  )
}

export default App
