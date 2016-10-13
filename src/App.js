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
        //styles
        const divStyles = {
            display: 'table',
            margin: '30px auto 0px auto'
        }
        const tableHeaderStyles = {
            padding: '30px',
            border: '1px solid #666'
        }

        const tableHeaderNames = ['#', 'Camper Name', 'Points in 30 days', 'All time Points']

        return (
            <div style={divStyles}>
                <table>
                    <thead>
                        <tr>
                            {
                                tableHeaderNames.map(name => <th style={tableHeaderStyles}>{name}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
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
