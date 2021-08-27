import logo from './logo.svg'
import './App.css'
import BasicTable from './component/BasicTable'
import SortingTable from './component/SortingTable'

function App() {
  return (
    <div className='App'>
      <h1>React Table</h1>
      {/* <BasicTable /> */}
      <SortingTable />
    </div>
  )
}

export default App
