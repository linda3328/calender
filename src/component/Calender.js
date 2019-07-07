import React, { Component } from 'react';
import styled from 'styled-components';
import * as moment from 'moment';
import App from '../App'
const CalenderContainer = styled.div`

width:100%;


`
const Header = styled.div`
display:flex;
`

const Title = styled.div`
flex-grow:1;
line-height:60px;
text-align:center;
border:1px solid #eee;
font-size:1.5rem;
font-weight: bold;
`

const Left = styled.div`
height:60px;
width:60px;
line-height:60px;
text-align:center;
border:1px solid #eee;
&:hover{cursor:pointer}
`

const Right = styled.div`
height:60px;
width:60px;
line-height:60px;
text-align:center;
border:1px solid #eee;
&:hover{cursor:pointer}
`
const HeadItem = styled.div`
flex: 1 0 14%;
overflow:hidden;
height:40px;
text-align:center;
line-height:40px;
border:1px solid #eee;
box-sizing:border-box;
background-color:${props => props.background || 'white'};
`



const Item = styled.div`
flex:1 0 14%;
overflow:hidden;
min-height:100px;
border:1px solid #eee;
box-sizing:border-box;
padding:8px;
background-color:${props => props.background || 'white'};
&:hover{cursor:pointer}
`



const Content = styled.div`
display:flex;
flex-wrap:wrap;
`
class Day extends Component {


    onClick = e => {
        if (this.props.onClick) {
            this.props.onClick(this.props.day)
        }
    }
    render() {
        const { day, background, items, } = this.props;
        const list = items.map((item) => {
            return <div>{item}</div>
        })
        return (
            <Item background={background} onClick={this.onClick} >
                {day.date()}
                {list}

            </Item >


        );
    }

}



class Calender extends Component {


    onPrew = e => {

        if (this.props.onClickPrevMonth) {
            this.props.onClickPrevMonth();
        }
    }

    onNext = e => {
        if (this.props.onClickNextMonth) {
            this.props.onClickNextMonth();
        }
    }
    onItemClick = (selected) => {
        if (this.props.onClickDate) {
            this.props.onClickDate(selected);
        }
    }

    renderHeader = () => {

        const { currunt } = this.props;
        const title = `${currunt.year()} - ${currunt.month() + 1} `

        return (

            <Header>
                <Left onClick={this.onPrew}>이전</Left>
                <Title>{title}</Title>
                <Right onClick={this.onNext}>다음</Right>
            </Header>

        );
    }

    renderDaysofWeek = () => {

        const titles = ['일', '월', '화', '수', '목', '금', '토']
        const items = titles.map((title, index) => {
            return <HeadItem key={index}> {title}</HeadItem>
        })
        return (

            <Content>
                {items}
            </Content>

        );
    }

    renderWeeks = () => {
        const { currunt, today, selected, items } = this.props;
        const firstDay = currunt.clone().day(0).startOf('day');
        const firstDayOfNextMouth = currunt.clone().add(1, 'month').startOf('day');

        const days = [];
        let index = firstDay;
        while (index.isBefore(firstDayOfNextMouth)) {
            for (let i = 0; i < 7; i++) {
                let background = "#fff";

                if (index.isSame(selected)) {
                    background = "#95adbe";
                } else if (index.isSame(today)) {
                    background = "#dff0ea";
                } else if (index.month() !== currunt.month()) {
                    background = "#dedede";
                }

                const selectedItems = items.filter((item) => item.selected.isSame(index)).map((item) => item.content);
                days.push(<Day
                    key={index.format()}
                    onClick={this.onItemClick}
                    day={index}
                    items={selectedItems}
                    background={background}>

                </Day >)

                index = index.clone().add(1, 'days')
            }
        }


        return <Content>

            {days}
        </Content>;
    }


    render() {
        return (

            <CalenderContainer>
                {this.renderHeader()}
                {this.renderDaysofWeek()}
                {this.renderWeeks()}
            </CalenderContainer>


        );

    }

}

export default Calender;
