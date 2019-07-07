import React, { Component } from 'react';
import styled from 'styled-components';
import * as moment from 'moment';
import Calender from './component/Calender'
import ScheduleBoard from './component/ScheduleBoard'

const Container = styled.div`
margin:0 auto;
width:${props => props.width || '100%'};
display:flex;

`

const Content = styled.div`

width:70%;


`

const SideContent = styled.div`

width:30%;


`
class App extends Component {

  state = {
    currunt: moment().date(1),
    today: moment().startOf('day'),
    selected: null,
    items: [],
  }

  onClickNextMonth = () => {
    this.setState({
      currunt: this.state.currunt.clone().add(1, 'month'),
    })
  }
  onClickPrevMonth = () => {
    this.setState({
      currunt: this.state.currunt.clone().add(-1, 'month'),
    })

  }
  onClickDate = (selected) => {
    this.setState({
      selected
    })
  }

  onAdd = (selected, content) => {
    this.setState({
      items: [...this.state.items, {
        selected,
        content
      }]
    })
  }
  render() {

    const { currunt, today, selected, items } = this.state;
    const selectedItems = items
      .filter(item => item.selected.isSame(selected))
      .map((item) => item.content)

    return (

      <Container>
        <Content>
          <Calender
            currunt={currunt}
            today={today}
            items={items}
            selected={selected}
            onClickPrevMonth={this.onClickPrevMonth}
            onClickNextMonth={this.onClickNextMonth}
            onClickDate={this.onClickDate}

          />
        </Content>

        <SideContent>
          <ScheduleBoard
            selected={selected}
            items={selectedItems}
            onAdd={this.onAdd}


          />
        </SideContent>
      </Container>

    );

  }

}

export default App;
