import React, {Component} from 'react'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { ajax } from 'jquery'

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
    const tableHeaderStyles = {
      padding: '30px',
      border: '1px solid #222',
      textAlign: 'center',
      color: 'white'
    }

    const tableHeaderStylesWithCursor = Object.assign({ cursor: 'pointer' }, tableHeaderStyles)

    const tableHeaderNames = this.props.tableHeaderNames.map((name, index) => {
      if(name === 'Points in 30 days' || name === 'All time Points')
        return (
          <th
            key={index}
            style={tableHeaderStylesWithCursor}
            onClick={(name === 'Points in 30 days') ?
            this.props.handle30DaysClick :
            this.props.handleAllTimeClick}>
            {name} &#x25BC;
          </th>
        )
      return <th key={index} style={tableHeaderStyles}>{name}</th>
    })

    return (
      <thead style={{backgroundColor: '#C45A2B'}}>
        <tr> { tableHeaderNames } </tr>
      </thead>
    )
  }
}

class TableRows extends Component {
  render() {
    return (
      <tr key={this.props.index}>
        <td style={this.props.tableDataStyles}>{this.props.index + 1}</td>
        <td
          style={this.props.imageDataStyle}>
          <img src={this.props.camper.img} alt='camper pic' style={{width: '30px', height: '30px', marginRight: '1px'}}/>  {this.props.camper.username}
        </td>
        <td style={this.props.tableDataStyles}>{this.props.camper.recent}</td>
        <td style={this.props.tableDataStyles}>{this.props.camper.alltime}</td>
      </tr>
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
    const imageDataStyle = Object.assign({}, tableDataStyles, { textAlign: 'left' })

    const campersData = this.props.campersData.map((camper, index) => {
      return (
        <TableRows
          index={index}
          tableDataStyles={tableDataStyles}
          imageDataStyle={imageDataStyle}
          camper={camper} />
      )
    })

    return <tbody> { campersData } </tbody>
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
    this.getData = this.getData.bind(this)
  }

  getData(url) {
    ajax({
      url: url,
      dataType: 'json'
    }).done(data => {
      this.setState({
        campersData: data
      })
    })
  }

  componentWillMount() {
    this.getData(this.props.urlRecent)
  }

  handle30DaysClick() {
    this.getData(this.props.urlRecent)
  }

  handleAllTimeClick() {
    this.getData(this.props.urlAllTime)
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
        <table style={{marginBottom: '30px'}} >
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
        <Table
          urlRecent="https://fcctop100.herokuapp.com/api/fccusers/top/recent"
          urlAllTime="https://fcctop100.herokuapp.com/api/fccusers/top/alltime"/>
        <Footer />
      </div>
    )
  }
}

export default App
