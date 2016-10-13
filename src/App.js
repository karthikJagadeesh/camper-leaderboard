import React, {Component} from 'react'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'

class Heading extends Component {
    render() {
        return (
            <div className="text-center header">
                <h1>CAMPER LEADERBOARD</h1>
            </div>
        )
    }
}

class TableHeading extends Component {
    render() {
        //styles
        const tableHeaderStyles = {
            padding: '30px',
            border: '1px solid #666'
        }
        //...............................

        return (
            <thead>
                <tr>
                    {
                        this.props.tableHeaderNames.map((name, index) =>
                            <th key={index} style={tableHeaderStyles}>{name}</th>)
                    }
                </tr>
            </thead>
        )
    }
}

class Table extends Component {
    constructor() {
        super()
        this.state = {
            topRecent: [],
            topAllTime: []
        }
    }

    componentWillMount() {
        $.ajax({
            url: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
            dataType: 'json'
        }).done((data) => {
            this.setState({
                topRecent: data
            })
        })
        $.ajax({
            url: 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime',
            dataType: 'json'
        }).done((data) => {
            this.setState({
                topAllTime: data
            })
        })
    }

    render() {
        const divStyles = {
            display: 'table',
            margin: '30px auto 0px auto'
        }
        const tableHeaderNames = ['#', 'Camper Name', 'Points in 30 days', 'All time Points']

        return (
            <div style={divStyles}>
                <table>
                    <TableHeading tableHeaderNames={tableHeaderNames} />
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
