import React, {Component} from 'react'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'

let recentData = []
let allTimeData = []

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
    constructor() {
        super()
        this.handle30DaysClick = this.handle30DaysClick.bind(this)
        this.handleAllTimeClick = this.handleAllTimeClick.bind(this)
    }

    handle30DaysClick() {
        this.props.handle30DaysClick()
    }
    handleAllTimeClick() {
        this.props.handleAllTimeClick()
    }

    render() {
        const tableHeaderStyles = {
            padding: '30px',
            border: '1px solid #222',
            textAlign: 'center',
            color: 'white'
        }
        const tableHeaderStylesWithCursor = {
            cursor: 'pointer'
        }
        Object.assign(tableHeaderStylesWithCursor, tableHeaderStyles)

        return (
            <thead style={{backgroundColor: '#C45A2B'}}>
                <tr>
                    {
                        this.props.tableHeaderNames.map((name, index) => {
                            if(name === 'Points in 30 days' || name === 'All time Points')
                                return (
                                    <th
                                        key={index}
                                        ref={name}
                                        style={tableHeaderStylesWithCursor}
                                        onClick={(name === 'Points in 30 days') ?
                                                this.handle30DaysClick :
                                                this.handleAllTimeClick}>
                                            {name} &#x25BC;
                                    </th>
                                )
                            return <th key={index} style={tableHeaderStyles}>{name}</th>
                        })
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
            border: '1px solid #222',
            textAlign: 'center',
            color: '#277'
        }
        const imageDataStyle = {}
        Object.assign(imageDataStyle, tableDataStyles)
        imageDataStyle.textAlign = 'left'

        return (
            <tbody>
                { this.props.campersData.map((camper, index) => {
                    return (
                        <tr key={index}>
                            <td style={tableDataStyles}>{index + 1}</td>
                            <td
                                style={imageDataStyle}>
                                <img src={camper.img} style={{width: '30px', height: '30px', marginRight: '1px'}}/>  {camper.username}
                            </td>
                            <td style={tableDataStyles}>{camper.recent}</td>
                            <td style={tableDataStyles}>{camper.alltime}</td>
                        </tr>
                    )
                }) }
            </tbody>
        )
    }
}

class Footer extends Component {
    render() {
        const style = {
            textRendering: 'geometricPrecision',
            transform: 'scaleY(1.1)',
            color: '#C75B2C',
            letterSpacing: '1px',
            textAlign: 'center'
        }

        return(
            <div style={style}>
                <h5>made with &hearts; react &hearts;</h5>
            </div>
        )
    }
}

class Table extends Component {
    constructor() {
        super()
        this.state = {
            campersData: []
        }
        this.handle30DaysClick = this.handle30DaysClick.bind(this)
        this.handleAllTimeClick = this.handleAllTimeClick.bind(this)
    }

    componentWillMount() {
        $.ajax({
            url: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
            dataType: 'json'
        }).done((data) => {
            this.setState({
                campersData: data
            })
            recentData = data
        })
    }

    componentDidMount() {
        $.ajax({
            url: 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime',
            dataType: 'json'
        }).done((data) => {
            allTimeData = data
        })
    }

    handle30DaysClick() {
        this.setState({
            campersData: recentData
        })
    }

    handleAllTimeClick() {
        this.setState({
            campersData: allTimeData
        })
    }

    render() {
        const divStyles = {
            display: 'table',
            margin: '30px auto 0px auto',
            width: '700px'
        }
        const tableHeaderNames = ['#', 'Camper Name', 'Points in 30 days', 'All time Points']

        return (
            <div style={divStyles}>
                <table style={{marginBottom: '30px'}}>
                    <TableHeading
                        tableHeaderNames={tableHeaderNames}
                        handle30DaysClick={this.handle30DaysClick}
                        handleAllTimeClick={this.handleAllTimeClick}/>
                    <TableData campersData={this.state.campersData} />
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
                <Footer />
            </div>
        )
    }
}

export default App
