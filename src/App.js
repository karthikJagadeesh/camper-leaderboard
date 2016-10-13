import React, {Component} from 'react'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'

class Heading extends Component {
    render() {
        const style = {
            textRendering: 'geometricPrecision',
            transform: 'scaleY(1.1)',
            color: '#CFB895',
            letterSpacing: '2px',
            textAlign: 'center'
        }

        return (
            <div style={style}>
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
            border: '1px solid #666',
            textAlign: 'center'
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

class TableData extends Component {
    render() {
        const tableDataStyles = {
            padding: ' 10px 30px',
            border: '1px solid #666',
            textAlign: 'center'
        }

        return (
            <tbody>
                { this.props.topRecent.map((camper, index) => {
                    return (
                        <tr key={index}>
                            <td style={tableDataStyles}>{index + 1}</td>
                            <td style={tableDataStyles}>{camper.username}</td>
                            <td style={tableDataStyles}>{camper.recent}</td>
                            <td style={tableDataStyles}>{camper.alltime}</td>
                        </tr>
                    )
                }) }
            </tbody>
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

    componentDidMount() {
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

                    <TableData topRecent={this.state.topRecent} topAllTime={this.state.topAllTime} />

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
