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
      const attrs = {
        style: tableHeaderStylesWithCursor,
        onClick: (name === 'Points in 30 days') ? this.props.handle30DaysClick : this.props.handleAllTimeClick
      }

      if(name === 'Points in 30 days' || name === 'All time Points')
        return <th key={name} {...attrs} > {name} &#x25BC; </th>

      return <th key={name} style={tableHeaderStyles}>{name}</th>
    })

    return (
      <thead style={{backgroundColor: '#C45A2B'}}>
        <tr> { tableHeaderNames } </tr>
      </thead>
    )
  }
}

class TableRow extends Component {
  render() {
    const tableDataStyles = {
      padding: ' 10px 30px',
      border: '1px solid #222',
      textAlign: 'center',
      color: '#277'
    }
    const imageDataStyle = Object.assign({}, tableDataStyles, { textAlign: 'left' })
    const { index, camper } = this.props

    return (
      <tr>
        <td style={tableDataStyles}>{index + 1}</td>
        <td style={imageDataStyle}>
          <img src={camper.img} alt='camper pic' style={{width: '30px', height: '30px', marginRight: '1px'}}/>  {camper.username}
        </td>
        <td style={tableDataStyles}>{camper.recent}</td>
        <td style={tableDataStyles}>{camper.alltime}</td>
      </tr>
    )
  }
}

class TableData extends Component {
  render() {
    const campersData = this.props.campersData.map((camper, index) => (<TableRow key={camper.username} index={index} camper={camper} />))

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
  constructor(props, context) {
    super(props, context)
    this.getData(this.props.urlRecent)
    this.state = { campersData: [] }
  }

  getData = (url) => {
    fetch(url).then(res => res.json()).then(data => {
      this.setState({
        campersData: data
      })
    })
  };

  handle30DaysClick = () => {
    this.getData(this.props.urlRecent)
  };

  handleAllTimeClick = () => {
    this.getData(this.props.urlAllTime)
  };

  render() {
    const divStyles = {
      display: 'table',
      margin: '30px auto 0px auto',
      width: '700px'
    }
    const tableHeaderNames = ['#', 'Camper Name', 'Points in 30 days', 'All time Points']
    const attrs = {
      tableHeaderNames: tableHeaderNames,
      handle30DaysClick: this.handle30DaysClick,
      handleAllTimeClick: this.handleAllTimeClick
    }

    return (
      <div style={divStyles}>
        <table style={{marginBottom: '30px'}} >
          <TableHeading {...attrs} />
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
