import React, { Component } from 'react';
import styled from 'styled-components';


const Header = styled.div`
font-size:1.5rem;
font-weight: bold;
text-align:center;
padding:15px;

`

const Container = styled.div`

padding:15px;


`
const Item = styled.div`
margin-bottom:8px;
padding:15px;
box-shadow:2px 2px 5px #eee;

`

class ScheduleBoard extends Component {

    state = { content: '' }

    static defauteProps = {
        selected: null,
        items: []
    }
    onHandleChange = e => {
        this.setState({
            content: e.target.value
        })
    }
    onAdd = e => {
        if (this.props.onAdd) {
            this.props.onAdd(this.props.selected, this.state.content)
            this.setState({
                content: ''
            })
        }
    }
    render() {
        const { content } = this.state;
        const { selected, items } = this.props

        if (!selected) {
            return <Header>Select Date</Header>
        }
        const list = items.map((item, index) => {
            return <Item key={index}>{item}</Item>
        })
        return (
            <Container>
                {list}
                <input value={content} onChange={this.onHandleChange} />
                <button onClick={this.onAdd}>add</button>
            </Container>
        )
    }
}
export default ScheduleBoard;