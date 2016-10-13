import React, {Component} from 'react'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class Heading extends Component {
    render() {
        return (
            <div className="text-center header">
                <h1>CAMPER LEADERBOARD</h1>
            </div>
        )
    }
}

class Table extends Component {
    render() {
        const divStyles = {
            display: 'table',
            margin: '30px auto 0px auto'
        }
        const tableHeaderStyles = {
            padding: '30px',
            border: '1px solid #666'
        }
        return (
            <div style={divStyles}>
                <table>
                    <thead>
                        <tr>
                            <th style={tableHeaderStyles}>#</th>
                            <th style={tableHeaderStyles}>Camper Name</th>
                            <th style={tableHeaderStyles}>Points in 30 days</th>
                            <th style={tableHeaderStyles}>All time Points</th>
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
}

class App extends Component {
    render() {
        return (
            <div>
                <Heading />
                <Table />
            </div>
        )
    }
}

export default App
